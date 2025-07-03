"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#220D54]/95 backdrop-blur-md shadow-lg" 
          : "bg-[#220D54]/90 backdrop-blur-sm"
      }`}
      style={{ height: '60px' }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Empty div on left for mobile to balance layout */}
          <div className="md:hidden w-10"></div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white hover:text-[#F4E007] transition-colors font-medium group text-lg"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F4E007] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Login Button - Right side (desktop) */}
          <div className="hidden md:block">
            <Button 
              asChild 
              className="bg-gradient-to-r from-[#F4E007] to-[#F4E007]/80 hover:from-[#F4E007]/90 hover:to-[#F4E007]/70 text-[#220D54] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2"
            >
              <Link href="/login">
                Login <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Now on the right side */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-[#F4E007]/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-[#F4E007]" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#220D54]/95 backdrop-blur-lg border-t border-[#F4E007]/20">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-[#F4E007] transition-colors font-medium px-4 py-3 rounded-lg hover:bg-[#F4E007]/10 flex items-center group text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    <ArrowRight className="ml-auto w-4 h-4 text-[#F4E007] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
                <div className="pt-4 px-4">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-[#F4E007] to-[#F4E007]/80 hover:from-[#F4E007]/90 hover:to-[#F4E007]/70 text-[#220D54] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Login <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}