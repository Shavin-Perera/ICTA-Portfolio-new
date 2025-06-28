// components/footer.tsx
"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MoveRight, Twitter, Facebook, Instagram, Linkedin, Github, Send, Check, Info } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [country, setCountry] = useState<{ code: string | null; name: string | null }>({ code: null, name: null });
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);

  useEffect(() => {
    // Fetch user's country based on IP
    const fetchCountry = async () => {
      try {
        const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=6cc039e652104acf89d8b1ecb6d3e9cf");
        const data = await response.json();
        
        if (data.country_code2 && data.country_name) {
          setCountry({ code: data.country_code2, name: data.country_name });
        }
      } catch (error) {
        console.error("Failed to fetch country data:", error);
      } finally {
        setIsLoadingCountry(false);
      }
    };

    fetchCountry();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        setEmail("");
      } else {
        throw new Error(data.message || "Failed to subscribe");
      }
    } catch (error) {
      setMessage({ 
        text: error instanceof Error ? error.message : "Failed to subscribe. Please try again.", 
        type: "error" 
      });
    } finally {
      setIsLoading(false);
      
      // Clear message after 8 seconds
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 8000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-indigo-900 overflow-hidden pt-16 pb-8">
      {/* Decorative elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              INTERNS
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Creating exceptional digital experiences with cutting-edge technology and personalized service.
            </p>
            
            <div className="flex space-x-4">
              {[
                { icon: Twitter, color: "hover:text-blue-400", label: "Twitter" },
                { icon: Facebook, color: "hover:text-blue-500", label: "Facebook" },
                { icon: Instagram, color: "hover:text-pink-500", label: "Instagram" },
                { icon: Linkedin, color: "hover:text-blue-600", label: "LinkedIn" },
                { icon: Github, color: "hover:text-gray-300", label: "GitHub" },
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`text-gray-400 ${social.color} transition-colors duration-300`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg text-white mb-5 flex items-center">
              Quick Links
              <MoveRight className="ml-2 w-4 h-4 text-blue-400" />
            </h4>
            <div className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Contact Us", href: "/contact" },
              ].map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
                >
                  <span className="flex items-center">
                    {link.name}
                    <MoveRight className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg text-white mb-5 flex items-center">
              Contact Info
              <MoveRight className="ml-2 w-4 h-4 text-blue-400" />
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href="mailto:mshavinperera@gmail.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    mshavinperera@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Support</p>
                  <span className="text-gray-300">24/7 Support</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg mt-1">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <span className="text-gray-300">Remote Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-6 bg-gradient-to-r from-blue-600/20 to-indigo-700/20 backdrop-blur-sm rounded-2xl border border-blue-500/20">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-bold text-white mb-3">Join Our Newsletter</h4>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Subscribe to receive updates, special offers, and the latest news.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe <Send className="ml-2 w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
              
              {message.text && (
                <div className={`mt-4 px-4 py-3 rounded-lg flex items-start ${
                  message.type === 'success' 
                    ? 'bg-green-900/30 border border-green-800' 
                    : message.type === 'error'
                    ? 'bg-red-900/30 border border-red-800'
                    : 'bg-blue-900/30 border border-blue-800'
                }`}>
                  <div className={`mr-3 mt-0.5 ${
                    message.type === 'success' ? 'text-green-400' : 
                    message.type === 'error' ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {message.type === 'success' ? <Check className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                  </div>
                  <div className={`text-left ${
                    message.type === 'success' ? 'text-green-300' : 
                    message.type === 'error' ? 'text-red-300' : 'text-blue-300'
                  }`}>
                    {message.text}
                  </div>
                </div>
              )}
              
              <p className="text-gray-400 text-xs mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} INTERNS. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
          </div>
          
          {/* Country identifier */}
          {!isLoadingCountry && country.code && country.name && (
            <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
              <ReactCountryFlag 
                countryCode={country.code}
                svg
                style={{ 
                  width: '1em', 
                  height: '1em',
                  marginRight: '0.5em',
                  borderRadius: '2px',
                  boxShadow: '0 0 1px rgba(0,0,0,0.5)'
                }}
              />
              <span>You're visiting from {country.name}</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}