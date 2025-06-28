import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

// Hardcoded credentials (temporary for testing)
const MONGODB_URI =process.env.MONGODB_URI!;
const MAILJET_API_KEY =  process.env.MAILJET_API_KEY!;
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY!;
const ADMIN_EMAIL = process.env.SENDER_EMAIL;

// Rate limiting store
const rateLimitStore = new Map()

function rateLimit(ip: string, limit = 5, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, [])
  }

  const requests = rateLimitStore.get(ip).filter((time: number) => time > windowStart)
  rateLimitStore.set(ip, requests) // Update store with filtered requests

  if (requests.length >= limit) {
    return false
  }

  requests.push(now)
  rateLimitStore.set(ip, requests)
  return true
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    
    console.log(`[${new Date().toISOString()}] Request from IP: ${ip}`)

    if (!rateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    console.log("Request body:", JSON.stringify(body, null, 2))
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      console.error("Missing fields")
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      console.error(`Invalid email: ${email}`)
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      timestamp: new Date(),
      ip: ip,
    }

    console.log("Sanitized data:", sanitizedData)

    // MongoDB connection
    let client: MongoClient | null = null;
    try {
      console.log("Connecting to MongoDB...")
      client = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
      })
      await client.connect()
      console.log("Connected to MongoDB")
      
      const db = client.db("portfolio")
      const collection = db.collection("contacts")
      
      console.log("Inserting document...")
      const insertResult = await collection.insertOne(sanitizedData)
      console.log(`Inserted document ID: ${insertResult.insertedId}`)
    } catch (dbError: any) {
      console.error("Database error:", dbError)
      if (dbError.name === 'MongoServerSelectionError') {
        return NextResponse.json({ error: "Database connection failed. Please try again later." }, { status: 500 })
      }
      throw dbError
    } finally {
      if (client) {
        await client.close()
        console.log("MongoDB connection closed")
      }
    }

    // Mailjet integration - FIXED
    const mailjetAuth = Buffer.from(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`).toString("base64")
    console.log("Mailjet auth:", mailjetAuth)

    // Using only TextPart to simplify and avoid HTML issues
    const userEmailData = {
      Messages: [
        {
          From: {
            Email: ADMIN_EMAIL,
            Name: "Portfolio Team",
          },
          To: [
            {
              Email: sanitizedData.email,
              Name: sanitizedData.name,
            },
          ],
          Subject: "Your message has been received!",
          TextPart: `Hi ${sanitizedData.name},\n\nThank you for reaching out! We've received your message and will get back to you shortly.\n\nBest regards,\nPortfolio Team`,
        },
      ],
    }

    const adminEmailData = {
      Messages: [
        {
          From: {
            Email: ADMIN_EMAIL,
            Name: "Portfolio Contact Form",
          },
          To: [
            {
              Email: ADMIN_EMAIL,
              Name: "Admin",
            },
          ],
          Subject: `New Contact Form Submission: ${sanitizedData.subject}`,
          TextPart: `New contact form submission:\n\nName: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nSubject: ${sanitizedData.subject}\nMessage: ${sanitizedData.message}`,
        },
      ],
    }

    // Send both emails with better error handling
    console.log("Sending emails...")
    let emailSuccess = true;
    let emailErrorDetails = "";
    
    try {
      // Send emails sequentially instead of parallel to avoid rate limiting
      const responses = [];
      
      // Send user email
      const userResponse = await fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
          Authorization: `Basic ${mailjetAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmailData),
      });
      
      responses.push(userResponse);
      console.log("User email response:", userResponse.status, userResponse.statusText);
      
      if (!userResponse.ok) {
        const userError = await userResponse.text();
        console.error("Mailjet user email error:", userError);
        emailSuccess = false;
        emailErrorDetails += `User email: ${userError}. `;
      }
      
      // Send admin email
      const adminResponse = await fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
          Authorization: `Basic ${mailjetAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminEmailData),
      });
      
      responses.push(adminResponse);
      console.log("Admin email response:", adminResponse.status, adminResponse.statusText);
      
      if (!adminResponse.ok) {
        const adminError = await adminResponse.text();
        console.error("Mailjet admin email error:", adminError);
        emailSuccess = false;
        emailErrorDetails += `Admin email: ${adminError}`;
      }
      
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      emailSuccess = false;
      emailErrorDetails = `Network error: ${(emailError as Error).message}`;
    }

    if (!emailSuccess) {
      console.warn("Emails not sent, but message was stored. Error details:", emailErrorDetails);
      // Return success to user but log the email error
      return NextResponse.json({ 
        message: "Message received successfully! But we encountered an issue sending confirmation emails.",
        warning: "Emails not sent"
      }, { status: 200 });
    }

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ 
      error: "Internal server error. Please try again later.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 });
  }
}