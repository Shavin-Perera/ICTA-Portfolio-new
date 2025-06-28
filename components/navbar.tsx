"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import ReactCountryFlag from "react-country-flag"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isSriLanka, setIsSriLanka] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=6cc039e652104acf89d8b1ecb6d3e9cf")
        const data = await response.json()
        
        if (data.country_code2 === "LK") {
          setIsSriLanka(true)
        }
      } catch (error) {
        console.error("Failed to detect country:", error)
      } finally {
        setIsLoading(false)
      }
    }

    detectCountry()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg" 
        : "bg-white/90 backdrop-blur-sm"
    }`}>
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo with gradient and country flag */}
          <Link 
            href="/" 
            className="text-2xl font-bold flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {!isLoading && isSriLanka && (
              <ReactCountryFlag 
                countryCode="LK"
                svg
                style={{
                  width: '1.2em',
                  height: '1.2em',
                  marginRight: '0.5em',
                  borderRadius: '2px',
                  boxShadow: '0 0 2px rgba(0,0,0,0.2)'
                }}
                title="Sri Lanka"
              />
            )}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              INTERNS
            </span>
            <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-800 hover:text-blue-600 transition-colors font-medium group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-700 hover:bg-blue-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-blue-600" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-blue-50 flex items-center group"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <ArrowRight className="ml-auto w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}