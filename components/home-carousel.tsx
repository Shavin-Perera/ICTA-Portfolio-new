'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Region-specific image collections
const regionImages = {
  // Middle East - Focus on luxury and cultural connections
  middleEast: [
    "https://images.unsplash.com/photo-1573843981264-be7f3d5c0e06", // Luxury hotel
    "https://images.unsplash.com/photo-1580327344181-c1163234e5a0", // Tea plantations
    "https://images.unsplash.com/photo-1566438480900-0609be27a4be"  // Cultural dance
  ],
  
  // Netherlands - Focus on cycling, water, and colonial connections
  netherlands: [
    "https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTM3MTMyNjMvMzI5NzllZmI0ODU1ZDIwMjM4YWQ5OTczYzM2MzRkMjguanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==", // Bicycles in SL
    "https://img.freepik.com/free-photo/american-jaguar-nature-habitat-south-american-jungle_475641-1069.jpg?t=st=1751948316~exp=1751951916~hmac=2be69ec360354480dbc44e1c7ea567805ed87604f7aecfffbbc1317ee9ca87ae&w=826", // Canals/water
    "data:image/jpeg;base64,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"  // Dutch fort
  ],
  
  // Asia - Focus on temples and beaches
  asia: [
    "https://www.wildimages-phototours.com/wp-content/uploads/2017/06/Dambulla-1-Sri-Lanka-Inger-Vandyke.jpg", // Temple
    "https://www.wildimages-phototours.com/wp-content/uploads/2017/06/Ruddy-Mongoose-1-Sri-Lanka-Inger-Vandyke.jpg",   // Beach
    "https://lp-cms-production.imgix.net/2024-08/-CantoiStock-1285881901-RFC.jpg?auto=format,compress&q=72&w=1024&h=810&fit=crop" // Street food
  ],
  
  // Australia - Focus on wildlife and adventure
  australia: [
    "https://www.wildimages-phototours.com/wp-content/uploads/2017/06/Asian-Elephants-2-Sri-Lanka-Inger-Vandyke.jpg", // Elephants
    "https://www.wildimages-phototours.com/wp-content/uploads/2017/06/Leopard-8-Sri-Lanka-Inger-Vandyke.jpg", // Leopards
    "https://www.wildimages-phototours.com/wp-content/uploads/2017/06/Black-naped-Hare-Sri-Lanka-Inger-Vandyke.jpg"    // Whale watching
  ],
  
  // Default - General highlights of Sri Lanka
default: [
    "https://media.licdn.com/dms/image/v2/D562DAQFvMCNDiGWbPA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1726846121765?e=1752552000&v=beta&t=hGyuHgOX9j6--5_JD6YAbkzifAqpG2baSTXrh8TzChk", // LinkedIn profile image 1
    "https://media.licdn.com/dms/image/v2/D562DAQHrhdmlzOx8dw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1726845987442?e=1752552000&v=beta&t=KImrsKxLRYHP1V1B7_cxBb1mZiD-SFifXcVY5C1FPb8", // LinkedIn profile image 2
    "https://media.licdn.com/dms/image/v2/D562DAQFEMECQc9dQvw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1726845924983?e=1752552000&v=beta&t=ddQrMoBM8OAFz5TwlrEl9gPLMNVbXhs5zJMTzGt-1fw" // LinkedIn profile image 3
  ]}

export default function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [region, setRegion] = useState('default')
  const [slides, setSlides] = useState(regionImages.default)

  // Determine region based on geolocation
  useEffect(() => {
    const determineRegion = async () => {
      try {
        const response = await fetch('/api/geolocation')
        if (!response.ok) throw new Error('Failed to fetch location')
        
        const { countryCode, countryName } = await response.json()
        
        // Map countries to regions
        if (['AE', 'SA', 'QA', 'KW', 'OM', 'BH'].includes(countryCode)) {
          setRegion('middleEast')
          setSlides(regionImages.middleEast)
        } else if (['NL', 'BE'].includes(countryCode)) {
          setRegion('netherlands')
          setSlides(regionImages.netherlands)
        } else if (['AU', 'NZ'].includes(countryCode)) {
          setRegion('australia')
          setSlides(regionImages.australia)
        } else if (['IN', 'CN', 'JP', 'KR', 'SG', 'MY', 'TH'].includes(countryCode)) {
          setRegion('asia')
          setSlides(regionImages.asia)
        }
      } catch (error) {
        console.error('Error determining region:', error)
        // Fallback to default images
        setRegion('default')
        setSlides(regionImages.default)
      } finally {
        setIsLoading(false)
      }
    }

    determineRegion()
  }, [])

  // Auto-rotate main carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (isLoading) {
    return (
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="animate-pulse bg-gray-800 w-full h-full"></div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Carousel Slides */}
      {slides.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={image}
              alt="Sri Lanka tourism"
              className="w-full h-full object-cover object-center"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
          
          {/* Purple Overlay (#220D54 with 60% opacity) */}
          <div 
            className="absolute inset-0 bg-[#220D54] opacity-60"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      ))}

      {/* Bold Greeting Message */}
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
              Hello, I'm Your Expert Software Developer
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Crafting high-performance digital solutions tailored to your business needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-4 justify-center"
          >
<div className="flex gap-4 justify-center">
  <Link href="/portfolio" passHref>
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      View My Work
    </motion.button>
  </Link>
  
  <Link href="/contact" passHref>
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.3 }}
      className="px-8 py-3 bg-white/10 text-white font-bold rounded-full backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Contact Me
    </motion.button>
  </Link>
</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="animate-bounce flex flex-col items-center">
          <p className="text-white/80 text-sm mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}