import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection(process.env.USER_COLLECTION || 'profiles');

    // Find user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Send login notification email
    if (process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY) {
      const mailjetClient = mailjet.apiConnect(
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_SECRET_KEY
      );

      const emailData = {
        Messages: [
          {
            From: {
              Email: process.env.SENDER_EMAIL || 'no-reply@example.com',
              Name: process.env.SENDER_NAME || 'Account Security',
            },
            To: [
              {
                Email: email,
                Name: `${user.firstName} ${user.lastName}`,
              },
            ],
            Subject: 'Successful Login Notification',
            TextPart: `Hello ${user.firstName}, you've successfully logged into your account.`,
            HTMLPart: `
              <h3>Hello ${user.firstName},</h3>
              <p>You've successfully logged into your account at ${new Date().toLocaleString()}.</p>
              <p>If this wasn't you, please contact our support team immediately.</p>
            `,
          },
        ],
      };

      try {
        await mailjetClient.post('send', { version: 'v3.1' }).request(emailData);
      } catch (mailError) {
        console.error('Mailjet error:', mailError);
        // Don't fail the login if email fails
      }
    }

    // Return user data without password and include a token
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ 
      user: safeUser,
      token: 'your-auth-token' // In production, generate a proper JWT here
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}