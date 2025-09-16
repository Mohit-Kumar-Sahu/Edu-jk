import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp } from 'lucide-react';

export function LandingPage() {
  const features = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Personalized Career Guidance",
      description: "Interest + Aptitude quiz based on RIASEC model for tailored career recommendations"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "142 J&K Government Colleges",
      description: "Complete directory with location, courses, NAAC ratings, and contact details"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Scholarship Checker",
      description: "PMSSS, NSP & J&K state schemes with auto-eligibility verification"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "AI Career Chatbot",
      description: "Get instant answers to career questions in English, Hindi & Urdu"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Application Tracker",
      description: "Apply to colleges with auto-filled forms and track your status"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Resume Builder",
      description: "Auto-generate professional resume PDFs from your profile"
    }
  ];

  const stats = [
    { number: "142", label: "Government Colleges" },
    { number: "50+", label: "Career Paths" },
    { number: "25+", label: "Scholarship Schemes" },
    { number: "100%", label: "Free for Students" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Edu2Career J&K</h1>
                <p className="text-xs text-gray-600">Career & Education Navigator</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex space-x-4"
            >
              <Link 
                to="/auth"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/auth"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your <span className="text-blue-600">Career Journey</span> Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              One-stop personalized career & education advisor for students in Jammu & Kashmir. 
              Discover your path, find the right college, and unlock your potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/auth"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Your Journey
              </Link>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg text-lg hover:bg-blue-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-20 w-16 h-16 bg-green-100 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-100 rounded-full opacity-60"
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Your Career
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From career discovery to college applications, we've got you covered with AI-powered tools and comprehensive resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Discover Your Perfect Career Path?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of J&K students who have already found their direction with Edu2Career J&K
            </p>
            <Link 
              to="/auth"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Free Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">Edu2Career J&K</span>
              </div>
              <p className="text-gray-400">
                Empowering students in Jammu & Kashmir with personalized career guidance and educational resources.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Career Quiz</li>
                <li>College Locator</li>
                <li>Scholarship Checker</li>
                <li>AI Chatbot</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Feedback</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Edu2Career J&K. Made with ❤️ for J&K students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}