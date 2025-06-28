"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "mshavinperera@gmail.com",
      link: "mailto:mshavinperera@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+94 76 320 1151",
      link: "tel:+94763201151",
    },
    {
      icon: Clock,
      title: "Availability",
      content: "24/7 Support",
      link: null,
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Remote Worldwide",
      link: null,
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
      
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-4 animate-bounce-slow"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>Get in touch</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Us</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ready to start your next project? Get in touch with us and let's discuss how we can help bring your ideas to life.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <motion.h2 
                className="text-2xl font-semibold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Get In Touch
              </motion.h2>
              
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden group">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-6">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-lg group-hover:scale-110 transition-transform">
                            <info.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-muted-foreground">{info.title}</h3>
                            {info.link ? (
                              <a 
                                href={info.link} 
                                className="text-lg font-semibold hover:text-blue-600 transition-colors"
                              >
                                {info.content}
                              </a>
                            ) : (
                              <p className="text-lg font-semibold">{info.content}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="mt-10 p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-lg font-bold mb-3">Need immediate assistance?</h3>
                <p className="text-gray-600 mb-4">
                  Our team is always ready to help you with any questions or urgent requests.
                </p>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = "tel:+94763201151"}
                >
                  <span className="flex items-center">
                    Call Now <ArrowRight className="ml-3 w-5 h-5" />
                  </span>
                </Button>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.h2 
                className="text-2xl font-semibold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Send us a Message
              </motion.h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}