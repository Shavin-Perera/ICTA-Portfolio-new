'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from "@/components/navbar";
import HeroCarousel from "@/components/hero-carousel";
import Footer from "@/components/footer";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store authentication token
      localStorage.setItem('authToken', data.token || 'authenticated');
      
      // Redirect to homepage and refresh to update navbar
      router.push('/');
      router.refresh();
    } catch (error) {
      setErrors({ submit: (error as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="relative">
        {/* Login Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center md:pt-20 px-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-white border-opacity-20 mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
            
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-100 rounded-md text-center">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-white text-opacity-80 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-white bg-opacity-10 border ${
                    errors.email ? 'border-red-500' : 'border-white border-opacity-30'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4E007] text-white placeholder-white placeholder-opacity-50`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
              
              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-white text-opacity-80 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 bg-white bg-opacity-10 border ${
                    errors.password ? 'border-red-500' : 'border-white border-opacity-30'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4E007] text-white placeholder-white placeholder-opacity-50`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>
              
              {/* Forgot Password */}
              <div className="mb-6 text-right">
                <Link href="/forgot-password" className="text-sm text-[#F4E007] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              
              {/* Login Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? 'bg-[#F4E007]/70' : 'bg-[#F4E007] hover:bg-[#F4E007]/90'
                } text-black py-2 px-4 rounded-md font-medium transition-colors mb-4 flex justify-center items-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </form>
            
            {/* Sign up link */}
            <div className="text-center text-sm text-white text-opacity-80 mb-4">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#F4E007] hover:underline">
                Create one
              </Link>
            </div>
            
            

          </div>
        </div>
        
        {/* Hero Carousel */}
        <HeroCarousel />
      </main>
      <Footer />
    </div>
  );
}