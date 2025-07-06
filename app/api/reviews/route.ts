import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rating, reviewText, firstName, lastName } = await request.json();

    // Basic validation
    if (!rating || !reviewText || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const reviewsCollection = db.collection('reviews');

    // Save review as temporary/pending
    const result = await reviewsCollection.insertOne({
      rating: Number(rating),
      reviewText,
      firstName,
      lastName,
      status: 'pending', // Temporary status
      createdAt: new Date(),
      updatedAt: new Date()
    });

    if (!result.acknowledged) {
      throw new Error('Failed to save review');
    }

    return NextResponse.json(
      { success: true, message: 'Review submitted for approval' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting review' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'approved'

    const { db } = await connectToDatabase()
    const reviewsCollection = db.collection('reviews')

    const reviews = await reviewsCollection.find({
      status: status
    }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(reviews, { status: 200 })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}