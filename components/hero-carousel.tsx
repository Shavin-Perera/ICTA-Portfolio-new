"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [greeting, setGreeting] = useState("")
  const [location, setLocation] = useState("")
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

  // Images for the circular carousel
  const natureImages = [
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  ]

  // Enhanced greeting messages with time awareness
  const timeBasedGreetings = {
    morning: ["Rise and shine", "Good morning", "Morning sunshine", "A beautiful dawn"],
    afternoon: ["Good afternoon", "Afternoon delight", "Lovely day", "Afternoon rays"],
    evening: ["Good evening", "Evening serenity", "Twilight beauty", "Peaceful dusk"],
    night: ["Good night", "Starry night", "Moonlit dreams", "Nocturnal bliss"]
  }

  // Fetch greeting based on user's location and time
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const geoRes = await fetch('/api/geolocation');
        if (!geoRes.ok) throw new Error('Failed to get location');
        
        const geoData = await geoRes.json();
        if (!geoData.countryName) throw new Error('Country not detected');
        
        setLocation(geoData.countryName);
        
        // Determine time of day
        const hours = new Date().getHours();
        let timeOfDay = 'day';
        if (hours < 12) timeOfDay = 'morning';
        else if (hours < 17) timeOfDay = 'afternoon';
        else if (hours < 21) timeOfDay = 'evening';
        else timeOfDay = 'night';
        
        // Get random greeting for time of day
        const greetings = timeBasedGreetings[timeOfDay];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        const greetingRes = await fetch('/api/greeting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            country: geoData.countryName,
            time: timeOfDay
          })
        });
        
        if (!greetingRes.ok) throw new Error('Failed to get greeting');
        
        const greetingData = await greetingRes.json();
        setGreeting(`${randomGreeting}, ${greetingData.greeting || "welcome to our world"}!`);
      } catch (error) {
        console.error("Greeting fetch error:", error);
        // Fallback greeting with time awareness
        const hours = new Date().getHours();
        let fallback = "Welcome";
        if (hours < 12) fallback = "Good morning";
        else if (hours < 17) fallback = "Good afternoon";
        else if (hours < 21) fallback = "Good evening";
        else fallback = "Good night";
        setGreeting(`${fallback}, dear visitor!`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGreeting();
  }, []);

  // Auto-rotate main carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-rotate circular carousel
  const [currentNatureImage, setCurrentNatureImage] = useState(0);
  useEffect(() => {
    const natureTimer = setInterval(() => {
      setCurrentNatureImage(prev => (prev + 1) % natureImages.length);
    }, 3000);
    return () => clearInterval(natureTimer);
  }, [natureImages.length]);

  // Split greeting for styling
  const firstSpaceIndex = greeting.indexOf(' ');
  const firstWord = firstSpaceIndex !== -1 ? greeting.substring(0, firstSpaceIndex) : greeting;
  const remainingText = firstSpaceIndex !== -1 ? greeting.substring(firstSpaceIndex) : '';

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

      {/* Two Column Layout */}
      <div className="absolute inset-0 flex flex-col md:flex-row z-10">
        {/* Left Column (Top on mobile) - Circular Carousel - NOW LARGER */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4">
          <motion.div 
            className="relative w-96 h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.3,
              duration: 0.8,
              ease: [0.16, 0.77, 0.47, 0.97]
            }}
          >
            {natureImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentNatureImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  alt="Nature"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
              <motion.div 
                className="text-white text-xl font-light tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {location || "Global"}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Bottom on mobile) - Greeting Message */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-4">
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97] 
              }}
              className="text-center w-full max-w-md px-4"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight tracking-tight"
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
                </span>
                <span className="text-white font-medium text-xl sm:text-2xl block mt-2">
                  {remainingText}
                </span>
              </motion.h1>
              
              <motion.p
                className="text-white/80 text-sm sm:text-base mt-6 max-w-xs mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Wherever you are, we're glad you're here. Let's create something beautiful together.
              </motion.p>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full text-white font-medium shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105">
                  Begin Journey
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}