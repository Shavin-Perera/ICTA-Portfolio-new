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
            
            {/* Divider */}
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-white border-opacity-30"></div>
              <span className="mx-4 text-sm text-white text-opacity-70">OR</span>
              <div className="flex-grow border-t border-white border-opacity-30"></div>
            </div>
            
            {/* Google Login Button */}
            <button className="w-full flex items-center justify-center gap-2 border border-white border-opacity-30 py-2 px-4 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm sm:text-base">Continue with Google</span>
            </button>
          </div>
        </div>
        
        {/* Hero Carousel */}
        <HeroCarousel />
      </main>
      <Footer />
    </div>
  );
}