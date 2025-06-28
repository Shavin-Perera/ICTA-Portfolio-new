// "use client"

// import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function HeroCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   const slides = [
//     {
//       image: "/placeholder.svg?height=600&width=1200",
//       title: "Full-Stack Web Development",
//       description: "Creating modern, responsive web applications with cutting-edge technologies",
//     },
//     {
//       image: "/placeholder.svg?height=600&width=1200",
//       title: "Digital Marketing Solutions",
//       description: "Boosting your online presence with strategic digital marketing campaigns",
//     },
//     {
//       image: "/placeholder.svg?height=600&width=1200",
//       title: "Custom Software Development",
//       description: "Building tailored software solutions to meet your unique business needs",
//     },
//   ]

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length)
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [slides.length])

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
//   }

//   return (
//     <div className="relative h-[70vh] overflow-hidden">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ${
//             index === currentSlide ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div
//             className="w-full h-full bg-cover bg-center relative"
//             style={{
//               backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
//             }}
//           >
//             <div className="absolute inset-0 flex items-center justify-center text-center text-white">
//               <div className="max-w-4xl px-4">
//                 <h1 className="text-4xl md:text-6xl font-bold mb-6">{slide.title}</h1>
//                 <p className="text-xl md:text-2xl mb-8 opacity-90">{slide.description}</p>
//                 <Button size="lg" className="bg-primary hover:bg-primary/90">
//                   Get Started
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Navigation Buttons */}
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
//         onClick={prevSlide}
//       >
//         <ChevronLeft className="h-6 w-6" />
//       </Button>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
//         onClick={nextSlide}
//       >
//         <ChevronRight className="h-6 w-6" />
//       </Button>

//       {/* Dots Indicator */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
            }}
          >
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
