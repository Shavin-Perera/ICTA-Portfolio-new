import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection(process.env.USER_COLLECTION || 'profiles');
    const otpCollection = db.collection('otp_verifications');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Generate 6-digit OTP and ensure it's stored as a string
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    // Store OTP in database
    await otpCollection.insertOne({
      email,
      otp: otp.toString(), // Ensure OTP is stored as string
      expiresAt: otpExpires,
      attempts: 0,
      createdAt: new Date()
    });

    // Send OTP email using Mailjet
    const mailjetClient = mailjet.apiConnect(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_SECRET_KEY!
    );

    const emailData = {
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: process.env.SENDER_NAME,
          },
          To: [
            {
              Email: email,
              Name: `${firstName} ${lastName}`,
            },
          ],
          Subject: 'Your Verification OTP',
          TextPart: `Your OTP is: ${otp}`,
          HTMLPart: `
            <h3>Hello ${firstName},</h3>
            <p>Your verification code is: <strong>${otp}</strong></p>
            <p>This code will expire in 15 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          `,
        },
      ],
    };

    await mailjetClient.post('send', { version: 'v3.1' }).request(emailData);

    // Return response without creating user yet
    return NextResponse.json({ 
      message: 'OTP sent to email',
      email,
      requiresVerification: true
    }, { status: 200 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}