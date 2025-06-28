"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"

export default function CTABanner() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = "/services"
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 inline-flex items-center animate-bounce-slow">
            <Rocket className="w-4 h-4 mr-2" />
            <span>Ready to get started?</span>
          </div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Start your next big project with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">confidence</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-10 text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the growing list of satisfied clients who have transformed their businesses with our expertise.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button
              size="lg"
              className="px-8 py-5 text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              onClick={scrollToServices}
            >
              <span className="flex items-center">
                Start Your Project <ArrowRight className="ml-3 w-5 h-5" />
              </span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-5 text-lg font-bold bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300"
              onClick={() => window.location.href = "/contact"}
            >
              Schedule a Consultation
            </Button>
          </motion.div>
        </div>
        
        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { value: "200+", label: "Projects Completed" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "150+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}