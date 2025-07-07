import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('profiles');

    const user = await usersCollection.findOne({ email, role: 'admin' });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials or not an admin' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
}