"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [greeting, setGreeting] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const geoRes = await fetch('/api/geolocation');
        if (!geoRes.ok) throw new Error('Failed to get location');
        
        const geoData = await geoRes.json();
        if (!geoData.countryName) throw new Error('Country not detected');
        
        const greetingRes = await fetch('/api/greeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            country: geoData.countryName,
            random: true
          })
        });
        
        if (!greetingRes.ok) throw new Error('Failed to get greeting');
        
        const greetingData = await greetingRes.json();
        setGreeting(greetingData.greeting || "Welcome!");
      } catch (error) {
        console.error("Greeting fetch error:", error);
        setGreeting("Welcome!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGreeting();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  const firstSpaceIndex = greeting.indexOf(' ');
  const firstWord = firstSpaceIndex !== -1 ? greeting.substring(0, firstSpaceIndex) : greeting;
  const remainingText = firstSpaceIndex !== -1 ? greeting.substring(firstSpaceIndex) : '';

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Modern semi-transparent overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
            
            {!isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.16, 0.77, 0.47, 0.97] 
                  }}
                  className="text-center max-w-4xl"
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight tracking-tight"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.7,
                      ease: [0.16, 0.77, 0.47, 0.97]
                    }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-500">
                      {firstWord}
                    </span><br />
                    <span className="text-white font-medium">
                      {remainingText}
                    </span>
                  </motion.h1>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Modern navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/15 backdrop-blur-lg border border-white/30 text-white hover:bg-white/25 z-10 rounded-full h-14 w-14 shadow-xl transition-all duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/15 backdrop-blur-lg border border-white/30 text-white hover:bg-white/25 z-10 rounded-full h-14 w-14 shadow-xl transition-all duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="h-7 w-7" />
      </Button>

      {/* Modern indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`relative h-2 transition-all ${index === currentSlide ? "w-8 bg-white" : "w-4 bg-white/40"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scaleY: 1.5 }}
          >
            {index === currentSlide && (
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.8, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}