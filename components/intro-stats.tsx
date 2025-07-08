"use client"

import Link from 'next/link';
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function IntroStats() {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    experience: 0,
    countries: 0,
    satisfaction: 0,
  })

  const finalCounts = {
    clients: 150,
    projects: 200,
    experience: 8,
    countries: 25,
    satisfaction: 98,
  }

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const timers = Object.keys(finalCounts).map((key) => {
      const finalValue = finalCounts[key as keyof typeof finalCounts]
      const increment = finalValue / steps

      return setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          [key]: Math.min(prev[key as keyof typeof prev] + increment, finalValue),
        }))
      }, stepDuration)
    })

    setTimeout(() => {
      timers.forEach((timer) => clearInterval(timer))
      setCounts(finalCounts)
    }, duration)

    return () => timers.forEach((timer) => clearInterval(timer))
  }, [isVisible])

  const stats = [
    { label: "Clients Served", value: Math.floor(counts.clients), suffix: "+", icon: "👥" },
    { label: "Projects Completed", value: Math.floor(counts.projects), suffix: "+", icon: "🚀" },
    { label: "Years Experience", value: Math.floor(counts.experience), suffix: "+", icon: "⏳" },
    { label: "Countries Served", value: Math.floor(counts.countries), suffix: "+", icon: "🌎" },
    { label: "Satisfaction Rate", value: Math.floor(counts.satisfaction), suffix: "%", icon: "❤️" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50"
    >
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Left side - Introduction text */}
          <div className="lg:w-1/2">
            
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Introduction 
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              I'm a passionate full-stack developer dedicated to creating exceptional digital experiences. With years of
              experience and a commitment to excellence, I help businesses transform their ideas into reality.
            </p>
            <div className="inline-flex items-center space-x-4">
<Link href="/about" passHref>
  <motion.button
    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
  >
    About Me
  </motion.button>
</Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <Image 
                src="/charith1.jpeg" 
                alt="Charith - Full Stack Developer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="flex justify-center"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 w-full max-w-xs border border-gray-100">
                <div className="p-6 text-center">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-2">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  
                  {/* Animated progress bar */}
                  <div className="mt-6 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ 
                        duration: 2, 
                        delay: 0.3,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}