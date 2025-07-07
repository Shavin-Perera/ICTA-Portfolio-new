"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"

export default function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Rocket className="mr-2 w-4 h-4" />
            <span>Ready to get started?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Let's Build Something Amazing Together
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Let's discuss your project and create something extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8 py-3 text-lg"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 text-lg"
            >
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

