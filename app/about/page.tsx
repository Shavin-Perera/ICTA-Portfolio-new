import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Target, BookOpen, Eye, Heart, ArrowRight, ChevronRight, MoveRight } from "lucide-react";

export default function AboutPage() {
  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      content:
        "Delivering cutting-edge solutions for modern businesses, empowering them to thrive in the digital landscape with innovative technology and personalized service.",
    },
    {
      icon: BookOpen,
      title: "Our Story",
      content:
        "Starting as a passionate developer, I've grown into a full-stack expert helping businesses worldwide. From small startups to established companies, every project has been a learning journey.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      content:
        "To become the go-to partner for businesses seeking reliable, scalable, and innovative digital solutions that drive growth and success in an ever-evolving technological world.",
    },
    {
      icon: Heart,
      title: "Our Values",
      content:
        "Integrity in every interaction, Innovation in every solution, Customer-Centric approach in every project, and continuous Growth through learning and adaptation.",
    },
  ]

  const stats = [
    { value: "200+", label: "Projects Delivered" },
    { value: "98%", label: "Client Retention" },
    { value: "50+", label: "Team Experts" },
    { value: "8+", label: "Years Experience" },
  ];

  const timeline = [
    { year: "2016", title: "Company Founded", description: "Started with a small team of passionate developers" },
    { year: "2018", title: "First Major Client", description: "Secured partnership with Fortune 500 company" },
    { year: "2020", title: "Global Expansion", description: "Opened offices in 3 countries across continents" },
    { year: "2023", title: "Award Recognition", description: "Received Tech Innovation Award for AI solutions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-bounce-slow">
              <span>Innovating since 2015</span>
              <ChevronRight className="ml-2 w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              About Our Vision
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
              We're a passionate team creating digital experiences that transform businesses and delight users worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Meet Our Team
              </button>
              <button className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full border-2 border-blue-500 hover:bg-blue-50 transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <Navbar />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These principles guide everything we do, from client interactions to product development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon container with animated background */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse"></div>
                      <div className="relative bg-white p-5 rounded-full border-4 border-blue-100 group-hover:border-blue-300 transition-all duration-500">
                        <section.icon className="w-10 h-10 text-blue-600 group-hover:text-indigo-700 transition-colors duration-500" />
                      </div>
                    </div>
                    
                    {/* Title with gradient text */}
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                      {section.title}
                    </h3>
                    
                    {/* Content */}
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Milestones that shaped our company's growth and success story.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-300 to-purple-400"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                >
                  <div className="w-1/2 px-8 py-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300">
                      <div className="text-sm font-semibold text-blue-500 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white shadow-lg"></div>
                      {index < timeline.length - 1 && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have accelerated their growth with our innovative solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center">
                Get Started <MoveRight className="ml-3 w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
}
