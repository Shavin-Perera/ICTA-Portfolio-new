"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Mail, User, MessageSquare, Send, MoveRight, Rocket } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        if (result.warning) {
          // Partial success - message saved but emails not sent
          toast({
            title: "Message Received!",
            description: (
              <div>
                <p>Thank you for your message! We've received it successfully.</p>
                <p className="mt-2 text-yellow-600">
                  Note: We encountered an issue sending confirmation emails. 
                  We'll still respond to your inquiry shortly.
                </p>
              </div>
            ),
            variant: "success",
            duration: 8000,
          })
        } else {
          // Full success
          toast({
            title: "Success!",
            description: "Message sent successfully! Thank you for reaching out.",
            variant: "success",
          })
        }
        
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        // Display specific backend error message
        const errorMessage = result.error || "Failed to send message. Please try again later."
        
        toast({
          title: "Sending Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      // Handle network errors
      toast({
        title: "Network Error",
        description: "Could not connect to the server. Please check your internet connection.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
      
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      
      <div className="p-8 md:p-12 relative z-10">
        <div className="text-center mb-8">
          <motion.div 
            className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-4 animate-bounce-slow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Rocket className="w-4 h-4 mr-2" />
            <span>Get in touch</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Send us a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Message</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have a project in mind? Fill out the form below and we'll get back to you within 24 hours.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={isSubmitting}
                className="py-5 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                className="py-5 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-blue-500" />
              Subject *
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              disabled={isSubmitting}
              className="py-5 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows={6}
              disabled={isSubmitting}
              className="py-5 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button 
              type="submit" 
              className="w-full py-6 text-base font-bold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Send Message <Send className="ml-3 w-5 h-5" />
                </span>
              )}
            </Button>
          </motion.div>
        </form>

        <motion.div 
          className="mt-8 pt-6 border-t border-gray-200 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-gray-600 text-sm mb-2">Prefer other contact methods?</p>
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="flex items-center bg-white text-gray-800 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300 px-8 py-5 text-lg font-bold"
              onClick={() => window.location.href = "/contact"}
            >
              View Contact Options <MoveRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}