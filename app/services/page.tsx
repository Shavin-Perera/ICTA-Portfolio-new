import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Code, Megaphone, Settings, Palette, ShoppingCart, Plug, MoveRight, ChevronRight } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to boost your online presence and reach.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Settings,
      title: "Custom Software Development",
      description: "Tailored software solutions designed to meet your specific business requirements.",
      gradient: "from-indigo-500 to-violet-500"
    },
    {
      icon: Palette,
      title: "Branding and Design",
      description: "Creative branding and design services to establish your unique visual identity.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms to help you sell products and services online.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Plug,
      title: "API Integration",
      description: "Seamless integration of third-party APIs and services into your existing systems.",
      gradient: "from-rose-500 to-red-500"
    },
  ]

  const stats = [
    { value: "200+", label: "Projects Delivered", icon: Code },
    { value: "98%", label: "Client Satisfaction", icon: Palette },
    { value: "50+", label: "Team Experts", icon: Settings },
    { value: "24/7", label: "Support", icon: Plug },
  ];

  const process = [
    { 
      step: "01", 
      title: "Discovery & Strategy", 
      description: "We dive deep into your business goals and challenges to craft a tailored strategy.",
      icon: ChevronRight
    },
    { 
      step: "02", 
      title: "Design & Prototyping", 
      description: "Our designers create intuitive interfaces and interactive prototypes.",
      icon: ChevronRight
    },
    { 
      step: "03", 
      title: "Development & Testing", 
      description: "Our developers build robust solutions with rigorous quality assurance.",
      icon: ChevronRight
    },
    { 
      step: "04", 
      title: "Launch & Optimization", 
      description: "We deploy your solution and continuously optimize for peak performance.",
      icon: ChevronRight
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-bounce-slow">
              <span>Innovative digital solutions</span>
              <ChevronRight className="ml-2 w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Our Services
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
              We transform your vision into reality with cutting-edge digital solutions tailored to your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                View Case Studies
              </button>
              <button className="px-8 py-3 bg-white text-gray-800 font-semibold rounded-full border-2 border-blue-500 hover:bg-blue-50 transition-all duration-300">
                Get a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              What We Offer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive digital services designed to elevate your brand and accelerate your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group relative"
              >
                {/* Gradient top bar */}
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon container with animated background */}
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse"></div>
                      <div className="relative bg-white p-5 rounded-full border-4 border-blue-100 group-hover:border-blue-300 transition-all duration-500">
                        <service.icon className="w-10 h-10 text-blue-600 group-hover:text-indigo-700 transition-colors duration-500" />
                      </div>
                    </div>
                    
                    {/* Title with gradient text */}
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                      {service.title}
                    </h3>
                    
                    {/* Content */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    {/* Read More Button */}
                    <button className="flex items-center text-blue-600 font-medium group-hover:text-indigo-700 transition-colors duration-300">
                      Learn more
                      <MoveRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
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
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              Our Process
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A structured approach to ensure your project's success from concept to launch.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-purple-400 z-0 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {process.map((step, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                      {step.step}
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="flex justify-center">
                        <step.icon className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              Let's discuss how our services can help you achieve your business goals.
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