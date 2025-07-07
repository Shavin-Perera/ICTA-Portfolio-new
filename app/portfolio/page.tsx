"use client";
import { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Target, Eye, Heart, ChevronRight, Clock, Zap, Globe, MessageCircle, Shield, User } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/navbar";
import TestimonialCarousel from "@/components/testimonial-carousel";
import Footer from "@/components/footer";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


export default function PortfolioPage() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Pie Chart Data
  const pieData = {
    labels: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  // Bar Chart Data
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Projects Completed',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [6, 5, 8, 3, 7, 9]
      }
    ]
  };

  // Carousel Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  const reviews = [
    {
      id: 1,
      quote: "Amazing work! Delivered beyond expectations.",
      author: "Client A",
      role: "CEO, Company A"
    },
    {
      id: 2,
      quote: "Highly professional and creative solutions.",
      author: "Client B",
      role: "Director, Company B"
    },
    {
      id: 3,
      quote: "Reliable and talented developer. Will work with again.",
      author: "Client C",
      role: "Manager, Company C"
    }
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
        ease: "easeOut" as const
      } 
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="w-full text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
            >
              My Portfolio Dashboard
            </motion.h1>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg text-gray-700 space-y-6"
              >
                <p>
                  This interactive dashboard showcases my skills, project statistics, and client testimonials. 
                  The visualizations provide insights into my technical expertise and project history.
                </p>
                
                {showFullDescription && (
                  <p>
                    The charts are built with Chart.js for accurate data representation, while the testimonial carousel 
                    highlights feedback from satisfied clients. The dashboard is fully responsive and built with modern 
                    web technologies including Next.js and Tailwind CSS.
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
            
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <div className="h-64">
                  <Pie data={pieData} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Skills & Analytics Dashboard
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Visual representation of my technical skills and project statistics
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-1 min-w-[300px] max-w-md bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Skills Distribution
                </h3>
                <div className="h-64">
                  <Pie data={pieData} />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1 min-w-[300px] max-w-md bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Projects Timeline
                </h3>
                <div className="h-64">
                  <Bar 
                    data={barData}
                    options={{
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-gray-600 text-sm font-medium">Total Projects</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">200+</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-gray-600 text-sm font-medium">Happy Clients</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">150+</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-gray-600 text-sm font-medium">Years Experience</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              My Services
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your business needs
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

      {/* Footer Section */}
      <Footer />
    </div>
  );
}