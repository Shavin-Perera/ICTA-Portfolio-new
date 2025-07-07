import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function verifyAdmin(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    console.log('No authorization header found');
    return { authorized: false, error: 'Unauthorized' };
  }

  try {
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('No token found in authorization header');
      return { authorized: false, error: 'Unauthorized' };
    }

    const sessionUrl = process.env.NEXTAUTH_URL
      ? `${process.env.NEXTAUTH_URL}/api/auth/session`
      : '/api/auth/session';

    const response = await fetch(sessionUrl, {
      headers: { 
        'Cookie': `next-auth.session-token=${token}`,
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.log('Session fetch failed with status:', response.status);
      return { authorized: false, error: 'Invalid session' };
    }

    const session = await response.json();
    console.log('Session data:', session);

    if (!session?.user?.email) {
      console.log('No email found in session');
      return { authorized: false, error: 'Forbidden' };
    }

    const adminEmails = ['rmshavinperera@gmail.com'];
    const userEmail = session.user.email.toLowerCase();

    if (!adminEmails.includes(userEmail)) {
      console.log(`User email ${userEmail} is not admin`);
      return { authorized: false, error: 'Forbidden' };
    }

    return { authorized: true };
  } catch (error) {
    console.error('Admin verification error:', error);
    return { authorized: false, error: 'Verification failed' };
  }
}

export async function GET(request: Request) {
  console.log('Admin GET request received');
  const { authorized, error } = await verifyAdmin(request);
  
  if (!authorized) {
    console.log('Access denied:', error);
    return NextResponse.json(
      { error: error || 'Unauthorized' }, 
      { status: error === 'Forbidden' ? 403 : 401 }
    );
  }

  try {
    const { db } = await connectToDatabase();
    const reviewsCollection = db.collection('reviews');
    
    const reviews = await reviewsCollection.find({
      status: { $in: ['pending', 'approved'] }
    }).sort({ createdAt: -1 }).toArray();

    console.log(`Fetched ${reviews.length} reviews`);
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log('Admin POST request received');
  const { authorized, error } = await verifyAdmin(request);
  
  if (!authorized) {
    console.log('Access denied:', error);
    return NextResponse.json(
      { error: error || 'Unauthorized' }, 
      { status: error === 'Forbidden' ? 403 : 401 }
    );
  }

  try {
    const { reviewId, action } = await request.json();
    
    if (!reviewId || !action) {
      console.log('Missing reviewId or action');
      return NextResponse.json(
        { error: 'Review ID and action are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const reviewsCollection = db.collection('reviews');

    let updateData;
    if (action === 'approve') {
      updateData = { status: 'approved', updatedAt: new Date() };
    } else if (action === 'reject') {
      updateData = { status: 'rejected', updatedAt: new Date() };
    } else {
      console.log('Invalid action:', action);
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(reviewId) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      console.log('No review modified - possibly not found');
      return NextResponse.json(
        { error: 'Review not found or already processed' },
        { status: 404 }
      );
    }

    console.log(`Review ${reviewId} ${action}d successfully`);
    return NextResponse.json(
      { success: true, message: `Review ${action}d successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing review:', error);
    return NextResponse.json(
      { error: 'Failed to process review' },
      { status: 500 }
    );
  }
}