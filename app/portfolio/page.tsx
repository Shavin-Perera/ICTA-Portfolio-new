"use client";
import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Target, Eye, Heart, ChevronRight, Clock, Zap, Globe, MessageCircle, Shield, User } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TestimonialCarousel from "@/components/testimonial-carousel";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface DashboardData {
  skills: {
    labels: string[];
    values: number[];
  };
  projectTimeline: Array<{
    name: string;
    duration: {
      years: number;
      months: number;
      days: number;
    };
  }>;
  stats: {
    totalProjects: number;
    averageClientRating: number;
    yearsOfExperience: number;
  };
}

export default function PortfolioPage() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashbord/fetch');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare chart data from fetched data
  const pieData = dashboardData ? {
    labels: dashboardData.skills.labels,
    datasets: [
      {
        data: dashboardData.skills.values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  } : {
    labels: [],
    datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }]
  };

  // Prepare project timeline data for bar chart
  const barData = dashboardData ? {
    labels: dashboardData.projectTimeline.map(project => project.name),
    datasets: [
      {
        label: 'Duration (Days)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: dashboardData.projectTimeline.map(project => 
          project.duration.years * 365 + project.duration.months * 30 + project.duration.days
        )
      }
    ]
  } : {
    labels: [],
    datasets: [{ label: 'Duration (Days)', backgroundColor: '', borderColor: '', borderWidth: 1, hoverBackgroundColor: '', hoverBorderColor: '', data: [] }]
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true
  };

  const reviews = [
    { id: 1, quote: "Amazing work! Delivered beyond expectations.", author: "Client A", role: "CEO, Company A" },
    { id: 2, quote: "Highly professional and creative solutions.", author: "Client B", role: "Director, Company B" },
    { id: 3, quote: "Reliable and talented developer. Will work with again.", author: "Client C", role: "Manager, Company C" }
  ];

  const features = [
    { icon: Clock, title: "24/7 Availability", description: "Round-the-clock support and communication for your peace of mind", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, title: "Fast Project Delivery", description: "Quick turnaround times without compromising on quality", color: "from-purple-500 to-pink-500" },
    { icon: Globe, title: "Worldwide Remote Support", description: "Global reach with local understanding of your market needs", color: "from-amber-500 to-orange-500" },
    { icon: MessageCircle, title: "Quick Communication", description: "Responsive communication channels for seamless collaboration", color: "from-emerald-500 to-teal-500" },
    { icon: Shield, title: "Secure Development", description: "Industry-standard security practices in all our solutions", color: "from-indigo-500 to-violet-500" },
    { icon: User, title: "Personalized Attention", description: "Dedicated focus on your unique requirements and goals", color: "from-rose-500 to-red-500" },
  ];

  const projects = [
    { category: "Digital Marketing", title: "SEO Optimization for E-commerce", description: "Improved organic traffic by 60% using keyword strategy and backlinks.", color: "from-yellow-400 to-pink-500", icon: Target },
    { category: "Digital Marketing", title: "Social Media Campaign", description: "Ran Facebook & Instagram ads boosting engagement by 120%.", color: "from-yellow-400 to-pink-500", icon: Globe },
    { category: "Web Design", title: "Modern Portfolio Website", description: "Built responsive personal portfolio using React & Tailwind CSS.", color: "from-cyan-500 to-blue-500", icon: Eye },
    { category: "Web Design", title: "E-commerce Website", description: "Design and implementation of Shopify-based store with custom theme.", color: "from-cyan-500 to-blue-500", icon: Globe },
    { category: "Mobile App Development", title: "Fitness Tracking App", description: "Cross-platform fitness app with React Native & Firebase.", color: "from-green-400 to-emerald-600", icon: Heart },
    { category: "Mobile App Development", title: "Food Delivery App", description: "Real-time order tracking & payment via Stripe integration.", color: "from-green-400 to-emerald-600", icon: Zap },
    { category: "API Integration", title: "Payment Gateway Integration", description: "Integrated Stripe & PayPal for seamless e-commerce checkout.", color: "from-purple-500 to-indigo-600", icon: Shield },
    { category: "API Integration", title: "3rd‑Party CRM Sync", description: "Automated syncing between CRM and internal database via REST API.", color: "from-purple-500 to-indigo-600", icon: Globe }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Helper function to format duration
  const formatDuration = (duration: { years: number; months: number; days: number }) => {
    const parts = [];
    if (duration.years > 0) parts.push(`${duration.years}y`);
    if (duration.months > 0) parts.push(`${duration.months}m`);
    if (duration.days > 0) parts.push(`${duration.days}d`);
    return parts.join(' ');
  };

  return (
    <div className="min-h-screen bg-white antialiased text-gray-800">
      <Navbar />
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 leading-tight"
              >
                My Portfolio Dashboard
              </motion.h1>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  This interactive dashboard showcases my skills, project statistics, and client testimonials.
                  The visualizations provide insights into my technical expertise and project history.
                </p>

                {showFullDescription && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The charts are built with Chart.js for accurate data representation, while the testimonial carousel
                    highlights feedback from satisfied clients. The dashboard is fully responsive and built with modern
                    web technologies including Next.js and Tailwind CSS.
                  </p>
                )}

                <button
                  onClick={toggleDescription}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                  <ChevronRight className={`w-5 h-5 ml-1 transition-transform ${showFullDescription ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <div className="h-80">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center h-full text-red-600 space-y-2">
                      <Shield className="w-10 h-10" />
                      <p>Error loading chart data</p>
                    </div>
                  ) : (
                    <Pie 
                      data={pieData} 
                      options={{
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              padding: 20,
                              font: {
                                size: 14
                              }
                            }
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Skills & Analytics Dashboard
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-700 leading-relaxed">
              Visual representation of my technical skills and project statistics
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg">Error loading dashboard data: {error}</p>
            </div>
          ) : dashboardData && (
            <>
              <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch mb-16">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex-1 min-w-[300px] max-w-xl bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Skills Distribution</h3>
                  <div className="h-80">
                    <Pie 
                      data={pieData} 
                      options={{
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              padding: 20,
                              font: {
                                size: 14
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex-1 min-w-[300px] max-w-xl bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Projects Timeline</h3>
                  <div className="h-80">
                    <Bar 
                      data={barData} 
                      options={{ 
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: { 
                          y: { 
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Duration (Days)',
                              font: {
                                weight: 'bold'
                              }
                            }
                          },
                          x: {
                            ticks: {
                              maxRotation: 45,
                              minRotation: 45
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          }
                        }
                      }} 
                    />
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider">Total Projects</h3>
                  <p className="text-4xl font-bold text-gray-800 mt-4">{dashboardData.stats.totalProjects}</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider">Average Rating</h3>
                  <p className="text-4xl font-bold text-gray-800 mt-4">{dashboardData.stats.averageClientRating.toFixed(1)}<span className="text-xl text-gray-500">/5</span></p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider">Years Experience</h3>
                  <p className="text-4xl font-bold text-gray-800 mt-4">{dashboardData.stats.yearsOfExperience}</p>
                </motion.div>
              </div>

              {/* Project Timeline Details */}
              <div className="max-w-4xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">Project Duration Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData.projectTimeline.map((project, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-800">{project.name}</span>
                        <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-full shadow-sm">
                          {formatDuration(project.duration)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials */}
<TestimonialCarousel />

      {/* My Projects */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-6"
            >
              My Projects
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-700 leading-relaxed">
              A glimpse into the solutions I've delivered
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={item} className="group">
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="p-8">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                      <div className={`relative bg-gradient-to-r ${project.color} p-4 rounded-full flex items-center justify-center w-16 h-16 mx-auto transition-all duration-300 group-hover:scale-110`}>
                        <project.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-center text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-center text-gray-500 font-medium mb-4">
                      {project.category}
                    </p>

                    <p className="text-gray-600 text-center leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full group-hover:w-32 transition-all duration-300"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-6"
            >
              My Services
            </motion.h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-700 leading-relaxed">
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
              <motion.div key={index} variants={item} className="group">
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="p-8">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                      <div className={`relative bg-gradient-to-r ${feature.color} p-4 rounded-full flex items-center justify-center w-16 h-16 mx-auto transition-all duration-300 group-hover:scale-110`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-center text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 text-center leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full group-hover:w-32 transition-all duration-300"></div>
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