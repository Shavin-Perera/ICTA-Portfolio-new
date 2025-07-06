import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    console.log('Starting OTP verification...'); // Debug log
    const body = await request.json();
    console.log('Request body:', body); // Debug log

    const { email, otp, firstName, lastName, password } = body;

    if (!email || !otp) {
      console.log('Missing email or OTP'); // Debug log
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const otpCollection = db.collection('otp_verifications');
    const usersCollection = db.collection(process.env.USER_COLLECTION || 'profiles');

    // Find the OTP record (sort by newest first)
    const otpRecord = await otpCollection.findOne(
      { email },
      { sort: { createdAt: -1 } }
    );
    console.log('OTP record from DB:', otpRecord); // Debug log

    if (!otpRecord) {
      console.log('No OTP record found'); // Debug log
      return NextResponse.json(
        { success: false, error: 'OTP not found. Please request a new one.' },
        { status: 400 }
      );
    }

    // Debug logs for comparison
    console.log(`Comparing OTPs - DB: ${otpRecord.otp} (${typeof otpRecord.otp}) vs Input: ${otp} (${typeof otp})`);

    // Convert both to strings for comparison
    if (otpRecord.otp.toString() !== otp.toString()) {
      console.log('OTP mismatch'); // Debug log
      return NextResponse.json(
        { success: false, error: 'Invalid OTP code' },
        { status: 400 }
      );
    }

    // Check if OTP is expired (15 minutes)
    const now = new Date();
    if (now > otpRecord.expiresAt) {
      console.log('OTP expired'); // Debug log
      await otpCollection.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { success: false, error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    console.log('OTP verified successfully. Creating user...'); // Debug log

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'user',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);
    console.log('User created:', result.insertedId); // Debug log

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      userId: result.insertedId.toString(),
      email: newUser.email,
      role: newUser.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    // Set HTTP-only cookie
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    // Clean up OTP record
    await otpCollection.deleteOne({ _id: otpRecord._id });

    console.log('Verification complete. Returning success.'); // Debug log
    return NextResponse.json(
      { 
        success: true,
        message: 'Account verified successfully',
        redirectTo: '/login'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'An error occurred during verification',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}