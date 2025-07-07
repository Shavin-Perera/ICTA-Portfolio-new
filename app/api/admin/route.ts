import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const reviewsCollection = db.collection('reviews');
    
    const reviews = await reviewsCollection.find({
      status: { $in: ['pending', 'approved'] }
    }).sort({ createdAt: -1 }).toArray();

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
  try {
    const { reviewId, action } = await request.json();
    
    if (!reviewId || !action) {
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
      return NextResponse.json(
        { error: 'Review not found or already processed' },
        { status: 404 }
      );
    }

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