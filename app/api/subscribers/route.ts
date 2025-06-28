// app/api/subscribers/route.ts
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
const Mailjet = require('node-mailjet');

export async function POST(request: Request) {
  const { email } = await request.json();
  
  // MongoDB credentials from environment variables
  const MONGODB_URI = process.env.MONGODB_URI!;
  const DB_NAME = process.env.DB_NAME;
  const COLLECTION_NAME = process.env.COLLECTION_NAME!;
  
  // Mailjet credentials
  const MAILJET_API_KEY = process.env.MAILJET_API_KEY!;
  const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY!;
  const SENDER_EMAIL = process.env.SENDER_EMAIL;
  const SENDER_NAME = process.env.SENDER_NAME;

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address" },
      { status: 400 }
    );
  }

  let client;
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    
    // Initialize Mailjet client properly
    const mailjet = Mailjet.apiConnect(MAILJET_API_KEY, MAILJET_SECRET_KEY);

    if (existingSubscriber) {
      // Send "already subscribed" email
      await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: SENDER_EMAIL,
                Name: SENDER_NAME
              },
              To: [
                {
                  Email: email,
                  Name: email.split('@')[0]
                }
              ],
              Subject: "You're Already Part of Our Community!",
              HTMLPart: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                  <h2 style="color: #2563eb;">Welcome Back to INTERNS!</h2>
                  <p>Hi there,</p>
                  <p>We noticed you tried to subscribe to our newsletter again - that's awesome!</p>
                  <p>You're already part of our community and will continue to receive our latest updates, news, and offers.</p>
                  
                  <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <h3 style="color: #2563eb; margin-top: 0;">What to expect:</h3>
                    <ul>
                      <li>Monthly tech insights and industry trends</li>
                      <li>Exclusive offers for subscribers</li>
                      <li>Early access to new features</li>
                      <li>Invitations to webinars and events</li>
                    </ul>
                  </div>
                  
                  <p>If you have any questions, feel free to reply to this email.</p>
                  
                  <p style="margin-top: 30px;">Best regards,<br>The INTERNS Team</p>
                  
                  <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
                    <p>© ${new Date().getFullYear()} INTERNS. All rights reserved.</p>
                    <p><a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> | 
                    <a href="#" style="color: #2563eb; text-decoration: none; margin-left: 10px;">Privacy Policy</a></p>
                  </div>
                </div>
              `
            }
          ]
        });
      
      return NextResponse.json(
        { message: "You're already subscribed! We've sent you a confirmation email." },
        { status: 200 }
      );
    }

    // Insert new subscriber
    const result = await collection.insertOne({
      email,
      subscribedAt: new Date(),
      source: "website-footer"
    });
    
    if (result.acknowledged) {
      // Send welcome email
      await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: SENDER_EMAIL,
                Name: SENDER_NAME
              },
              To: [
                {
                  Email: email,
                  Name: email.split('@')[0]
                }
              ],
              Subject: "Welcome to INTERNS Newsletter!",
              HTMLPart: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                  <h2 style="color: #2563eb; text-align: center;">Welcome to INTERNS!</h2>
                  
                  <div style="text-align: center; margin: 20px 0;">
                    <div style="background-color: #dbeafe; width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#2563eb">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <p>Hi there,</p>
                  <p>Thank you for subscribing to the INTERNS newsletter! We're excited to have you on board.</p>
                  
                  <p>Here's what you can look forward to:</p>
                  <ul>
                    <li>Monthly updates on the latest tech trends</li>
                    <li>Exclusive insights from our development team</li>
                    <li>Early access to new features and services</li>
                    <li>Special offers just for our subscribers</li>
                  </ul>
                  
                  <p>Your first newsletter will arrive in the next 24 hours. In the meantime, feel free to explore our website:</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.NEXTAUTH_URL}" 
                      style="display: inline-block; background: linear-gradient(to right, #2563eb, #4f46e5); 
                      color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                      Visit Our Website
                    </a>
                  </div>
                  
                  <p>If you have any questions or suggestions, simply reply to this email - we'd love to hear from you!</p>
                  
                  <p>Best regards,<br>The INTERNS Team</p>
                  
                  <div style="margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px;">
                    <p>© ${new Date().getFullYear()} INTERNS. All rights reserved.</p>
                    <p><a href="#" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> | 
                    <a href="#" style="color: #2563eb; text-decoration: none; margin-left: 10px;">Privacy Policy</a></p>
                  </div>
                </div>
              `
            }
          ]
        });
      
      return NextResponse.json(
        { message: "Thank you for subscribing! We've sent a welcome email to your inbox." },
        { status: 200 }
      );
    } else {
      throw new Error("Failed to save subscription");
    }
  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { 
        message: "Failed to subscribe. Please try again.",
        error: error.message || error.toString() 
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}