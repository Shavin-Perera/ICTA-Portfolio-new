'use client';

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Code, Settings, Palette, Brain, MoveRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ServicesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{firstName: string; lastName: string; email: string} | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const services = [
    {
      icon: Code,
      title: "Digital Marketing",
      description: "Boost online presence using targeted strategies like SEO (Search Engine Optimization), SEM (Search Engine Marketing), email campaigns, and social media marketing.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "Web Design",
      description: "Develop visually appealing, responsive websites with intuitive navigation and user-centric layouts.",
      gradient: "from-indigo-500 to-violet-500"
    },
    {
      icon: Palette,
      title: "Mobile App Development",
      description: "Build custom mobile apps for Android and iOS platforms with seamless performance and engaging user experiences.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Brain,
      title: "API Integration",
      description: "Integrate third-party APIs such as payment gateways, social logins, and external data sources to enhance functionality.",
      gradient: "from-rose-500 to-red-500"
    },
  ];

  const stats = [
    { value: "200+", label: "Projects Delivered", icon: Code },
    { value: "98%", label: "Client Satisfaction", icon: Palette },
    { value: "50+", label: "Team Experts", icon: Settings },
    { value: "24/7", label: "Support", icon: Brain }
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

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          });
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleGetQuote = (serviceTitle: string) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    setSelectedService(serviceTitle);
    setFormData({
      name: `${userData?.firstName} ${userData?.lastName}`,
      email: userData?.email || "",
      subject: `Quote Request for ${serviceTitle}`,
      message: `I'm interested in getting a quote for your ${serviceTitle} service. Please provide more details.`,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit quote request');
      }

      toast({
        title: "Success!",
        description: "Your quote request has been submitted successfully!",
      });

      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || 'Failed to submit quote request',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse-slow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Our Services
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
              As a multifaceted freelancer, I specialize in delivering end-to-end digital solutions that help businesses grow, streamline operations, and connect with their audience more effectively.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group relative"
              >
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-pulse"></div>
                      <div className="relative bg-white p-5 rounded-full border-4 border-blue-100 group-hover:border-blue-300 transition-all duration-500">
                        <service.icon className="w-10 h-10 text-blue-600 group-hover:text-indigo-700 transition-colors duration-500" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <button 
                      onClick={() => handleGetQuote(service.title)}
                      className="flex items-center text-blue-600 font-medium group-hover:text-indigo-700 transition-colors duration-300"
                    >
                      Get connected
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
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center text-white">
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
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

      {/* Quote Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Get connected for {selectedService}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}