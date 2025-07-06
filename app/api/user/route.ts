import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real app, verify the JWT token here
    // For now, we'll just check if it exists in localStorage
    
    const { db } = await connectToDatabase();
    const collection = db.collection(process.env.USER_COLLECTION || 'profiles');
    
    // Find user by token (in a real app, decode JWT to get user ID)
    const user = await collection.findOne({ 
      /* your user lookup logic here */
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return only necessary user data
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 200 });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching user data' },
      { status: 500 }
    );
  }
}