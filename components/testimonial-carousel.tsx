"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations",
      rating: 5,
      testimonial:
        "Exceptional work! The website exceeded our expectations and was delivered on time. The attention to detail and professionalism was outstanding.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Michael Chen",
      role: "Product Director, StartupX",
      rating: 5,
      testimonial:
        "Working with this team was a game-changer for our business. They understood our vision and brought it to life perfectly. Highly recommended!",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager, Global Solutions",
      rating: 5,
      testimonial:
        "The custom software solution has streamlined our operations significantly. The support and communication throughout the project was excellent.",
      color: "from-amber-500 to-orange-500"
    },
    {
      name: "David Thompson",
      role: "Marketing Director, EcomPro",
      rating: 5,
      testimonial:
        "Professional, reliable, and incredibly skilled. Our e-commerce platform has seen a 200% increase in conversions since the redesign.",
      color: "from-emerald-500 to-teal-500"
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
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
                    <div className={`bg-gradient-to-r ${testimonials[currentTestimonial].color} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 mx-1" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    "{testimonials[currentTestimonial].testimonial}"
                  </blockquote>

                  <div>
                    <div className="font-bold text-lg text-gray-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
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
        </div>
      </div>
    </section>
  )
}