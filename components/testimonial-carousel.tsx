"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, Loader2 } from "lucide-react"

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState(0)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await fetch('/api/reviews?status=approved')
        if (!response.ok) throw new Error('Failed to fetch reviews')
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApprovedReviews()
  }, [])

  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        setDirection(1)
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [testimonials.length])

  const nextTestimonial = () => {
    if (testimonials.length <= 1) return
    setDirection(1)
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    if (testimonials.length <= 1) return
    setDirection(-1)
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  const getRandomGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-amber-500 to-orange-500",
      "from-emerald-500 to-teal-500",
      "from-indigo-500 to-violet-500",
      "from-rose-500 to-red-500"
    ]
    return gradients[index % gradients.length]
  }

  if (isLoading) {
    return (
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4 relative z-10 flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            No approved testimonials yet. Check back later!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-bounce-slow">
            <span>Client testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            
            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentTestimonial}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className={`bg-gradient-to-r ${getRandomGradient(currentTestimonial)} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mx-1" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    "{testimonials[currentTestimonial].reviewText}"
                  </blockquote>

                  <div>
                    <div className="font-bold text-lg text-gray-800">
                      {testimonials[currentTestimonial].firstName} {testimonials[currentTestimonial].lastName}
                    </div>
                    {testimonials[currentTestimonial].role && (
                      <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentTestimonial ? 1 : -1)
                    setCurrentTestimonial(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 w-8" 
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}