"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { 
  Target, Eye, Heart, 
  ChevronRight, 
  Clock, Zap, Globe, MessageCircle, Shield, User 
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import charith from "@/public/charith.jpeg";

export default function AboutPage() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // About Page Sections
  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      content:
        "To leverage my expertise in project management, digital strategy, and industry development to create impactful solutions that support business growth, promote technology adoption, and strengthen the national digital economy, with a focus on empowering SMEs and large-scale enterprises.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      content:
        "To be a driving force in empowering businesses and industries through innovative technology, digital transformation, and sustainable development, contributing to a digitally advanced and inclusive Sri Lanka where all citizens can thrive in the global digital economy",      
    },
    {
      icon: Heart,
      title: "Our Values",
      content:
        "Integrity in every interaction, Innovation in every solution, Customer-Centric approach in every project, and continuous Growth through learning and adaptation.",
    },
  ];

  
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
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with New Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Centered Name */}
          <div className="w-full text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
            >
              Charith Kandamulla
            </motion.h1>
          </div>
          
          {/* Content Row */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left - Description */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg text-gray-700 space-y-6"
              >
                <p>
                  I am a Chartered Professional with a strong background in Project Management, Digital Strategy, Marketing, and Software Engineering, with over 8 years of experience across both the public and private sectors. Currently, I serve as the Manager – Industry Development (SME & Large Scale) at the Information and Communication Technology Agency of Sri Lanka (ICTA), where I focus on empowering businesses through digital transformation and innovative ICT solutions.
                </p>
                
                {showFullDescription && (
                  <p>
                    Throughout my career, I've held diverse leadership roles, including Assistant Manager – Digital at Asia Broadcasting Corporation, Team Lead – Category Management at ikman.lk, and Executive in charge of Pirelli Tyres at Toyota Lanka. These experiences have helped me build expertise in project management, operations, market development, and digital growth. I am driven by the belief that technology is a key enabler for business success and national development, and I am committed to leveraging my skills to make a lasting impact.
                  </p>
                )}
                
                <button
                  onClick={toggleDescription}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {showFullDescription ? 'View Less' : 'View More'}
                  <ChevronRight className={`w-5 h-5 ml-1 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                </button>
              </motion.div>
            </div>
            
            {/* Right - Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg"
              >
                <Image 
                  src={charith} 
                  alt="Charith Kandamulla"
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-500"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Our Core Principles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The foundation of everything we do at our company
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-1 min-w-[300px] max-w-md bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-shrink-0 bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                    <section.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="text-center flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      

      {/* Why Choose Us Section */}
      <section className="relative py-24 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            
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
               
                className="group"
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="p-8">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
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
                    
                    <div className="mt-8 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full group-hover:w-32 transition-all duration-500"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}