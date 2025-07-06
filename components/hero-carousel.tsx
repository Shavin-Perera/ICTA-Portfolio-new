"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Main slides for the background carousel
  const slides = [
    { 
      image: "https://media.licdn.com/dms/image/v2/D5622AQE_iWJFI8aSAA/feedshare-shrink_2048_1536/B56ZeluU9vGQAo-/0/1750832075775?e=1753920000&v=beta&t=1ZAiYgNFn_lNp-OKDZNI7XpsWW9akmtabISfWCW9a2A",
    },
    { 
      image: "https://media.licdn.com/dms/image/v2/D5622AQEZQt4PkJzhDQ/feedshare-shrink_2048_1536/B56ZdpJownH8As-/0/1749815826735?e=1753920000&v=beta&t=AdpmWMtW5lQ5un5xGKADkfdaxhdb1hHAJXnjm_ZIU1M",
    },
    { 
      image: "https://media.licdn.com/dms/image/v2/D5622AQE9mk7lk4zjeg/feedshare-shrink_2048_1536/B56ZeH9igiHoAw-/0/1750332754269?e=1753920000&v=beta&t=t-A_1BA9GAKr7JDN1Qo08tEyk63kyaf-0F-gtmO9KV0",
    },
  ]

  // Auto-rotate main carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover object-center"
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
  );
}