'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ReviewForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{firstName: string; lastName: string} | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            firstName: data.firstName,
            lastName: data.lastName
          });
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token || !userData) {
        toast.error('Please log in to submit a review');
        router.push('/login');
        return;
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating,
          reviewText,
          firstName: userData.firstName,
          lastName: userData.lastName,
          status: 'pending'
        })
      });

      if (response.ok) {
        toast.success('Review submitted for approval!');
        setRating(0);
        setReviewText('');
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      toast.error('Error submitting review');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 w-full">
        <Loader2 className="animate-spin h-8 w-8 text-[#F4E007]" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-center w-full border-b border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-3">Want to leave a review?</h3>
          <p className="text-white/90 mb-6 text-lg">Please log in to share your experience</p>
          <Button 
            onClick={() => router.push('/login')}
            className="bg-[#F4E007] hover:bg-[#F4E007]/90 text-[#220D54] font-bold py-6 text-lg shadow-md hover:shadow-lg transition-all"
          >
            Log In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 w-full border-b border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-6">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white/90 text-lg font-semibold mb-3">
              Your Rating
            </label>
            <div className="flex space-x-2 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transform hover:scale-110 transition-transform"
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating ? 'text-[#F4E007] fill-current' : 'text-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-white/70">
              {rating > 0 ? `You selected ${rating} star${rating !== 1 ? 's' : ''}` : 'Please select a rating'}
            </p>
          </div>

          <div className="mb-6">
            <label htmlFor="review" className="block text-white/90 text-lg font-semibold mb-3">
              Your Review
            </label>
            <textarea
              id="review"
              rows={5}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-3 bg-white/15 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#F4E007] text-white placeholder-white/60 text-lg"
              placeholder="Share your experience in detail..."
              required
              aria-describedby="review-help"
            />
            <p id="review-help" className="text-sm text-white/70 mt-1">
              Minimum 20 characters required
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0 || reviewText.length < 20}
              className={`bg-[#F4E007] hover:bg-[#F4E007]/90 text-[#220D54] font-bold py-6 px-8 text-lg shadow-md hover:shadow-lg transition-all ${
                (rating === 0 || reviewText.length < 20) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}