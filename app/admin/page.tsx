'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star, Check, X, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminReviewPanel() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      toast.error('Error loading reviews');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewAction = async (reviewId: string, action: 'approve' | 'reject') => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewId, action }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} review`);

      toast.success(`Review ${action}d successfully`);
      fetchReviews(); // Refresh the list
    } catch (error) {
      toast.error(`Error ${action}ing review`);
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#220D54] to-[#0D0527] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Review Management</h1>
          <Button
            onClick={fetchReviews}
            variant="outline"
            className="bg-transparent text-white hover:bg-white/10 border-white/20"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-12 w-12 text-[#F4E007]" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
            <p className="text-white/80 text-lg">No reviews pending approval</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 border ${
                  review.status === 'approved' 
                    ? 'border-green-500/30' 
                    : 'border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">
                      {review.firstName} {review.lastName}
                    </h3>
                    <p className="text-xs text-white/50">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-[#F4E007] fill-current' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4">{review.reviewText}</p>
                <div className="flex justify-end space-x-2">
                  {review.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleReviewAction(review._id, 'approve')}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleReviewAction(review._id, 'reject')}
                        disabled={isProcessing}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <X className="mr-1 h-4 w-4" />
                            Reject
                          </>
                        )}
                      </Button>
                    </>
                  )}
                  {review.status === 'approved' && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Approved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}