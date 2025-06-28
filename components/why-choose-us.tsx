"use client" ;
import { motion } from "framer-motion"
import { Clock, Zap, Globe, MessageCircle, Shield, User } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support and communication for your peace of mind",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Fast Project Delivery",
      description: "Quick turnaround times without compromising on quality",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Worldwide Remote Support",
      description: "Global reach with local understanding of your market needs",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: MessageCircle,
      title: "Quick Communication",
      description: "Responsive communication channels for seamless collaboration",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Secure Development",
      description: "Industry-standard security practices in all our solutions",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: User,
      title: "Personalized Attention",
      description: "Dedicated focus on your unique requirements and goals",
      color: "from-rose-500 to-red-500"
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-bounce-slow">
            <span>Our competitive advantages</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We combine technical expertise with exceptional service to deliver results that exceed expectations.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="p-8">
                  <div className="relative mb-8">
                    {/* Gradient background for icon */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse"></div>
                    
                    {/* Icon container */}
                    <div className={`relative bg-gradient-to-r ${feature.color} p-4 rounded-full flex items-center justify-center w-16 h-16 mx-auto transition-all duration-500 group-hover:scale-110`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 group-hover:text-indigo-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Decorative line */}
                  <div className="mt-8 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full group-hover:w-32 transition-all duration-500"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              View Case Studies
            </button>
            <button className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full border-2 border-blue-500 hover:bg-blue-50 transition-all duration-300">
              Get a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}