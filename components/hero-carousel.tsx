'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a", // Bicycles in SL
    "https://images.unsplash.com/photo-1566438480900-0609be27a4be", // Canals/water
    "https://images.unsplash.com/photo-1573843981264-be7f3d5c0e06"  // Dutch fort
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
    "https://images.unsplash.com/photo-1566438480900-0609be27a4be", // Sigiriya
    "https://images.unsplash.com/photo-1573843981264-be7f3d5c0e06", // Kandy
    "https://images.unsplash.com/photo-1580327344181-c1163234e5a0"  // Galle Fort
  ]
}

export default function HeroCarousel() {
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
    </div>
  )
}