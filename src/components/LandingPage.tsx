import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

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
              className="flex items-center space-x-4"
            >
              <LanguageSwitcher />
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
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Your <span className="text-blue-600">Career Journey</span> Starts Here
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              One-stop personalized career & education advisor for students in Jammu & Kashmir. 
              Discover your path, find the right college, and unlock your potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link
                to="/auth"
                className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-lg w-full sm:w-auto font-semibold"
              >
                Discover Your Career Path
              </Link>
              <button className="px-6 sm:px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-base sm:text-lg hover:bg-blue-50 transition-colors w-full sm:w-auto font-semibold">
                See Success Stories
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

      {/* Video Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Edu2Career J&K in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how our AI-powered platform helps J&K students discover their perfect career path and apply to colleges seamlessly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/video-poster.jpg"
                preload="metadata"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                <source src="/demo-video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Live Demo</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">
              Experience the full power of our career guidance platform
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <span>Try It Now</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted by J&K Students
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of students across Jammu & Kashmir who have found their career path with Edu2Career J&K
            </p>
          </motion.div>
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from J&K
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students who transformed their careers with our guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">AS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Ayesha Sharma</h4>
                  <p className="text-sm text-gray-600">Srinagar • Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Edu2Career helped me discover my passion for technology. The career quiz was spot-on, and I got into NIT Srinagar through their guidance!"
              </p>
              <div className="flex text-yellow-400 mt-3">
                ★★★★★
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">RK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Rahul Kumar</h4>
                  <p className="text-sm text-gray-600">Jammu • Medical Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The scholarship finder saved me thousands! I got PMSSS and NSP scholarships through their platform. Highly recommended for J&K students."
              </p>
              <div className="flex text-yellow-400 mt-3">
                ★★★★★
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">MB</span>
                </div>
                <div>
                  <h4 className="font-semibold">Mehreen Bhat</h4>
                  <p className="text-sm text-gray-600">Baramulla • Business Analyst</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "From a small town in Kashmir to working at a top company in Bangalore. The career guidance and college locator made it possible!"
              </p>
              <div className="flex text-yellow-400 mt-3">
                ★★★★★
              </div>
            </motion.div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/quiz" className="hover:text-white transition-colors">Career Quiz</Link></li>
                <li><Link to="/colleges" className="hover:text-white transition-colors">College Locator</Link></li>
                <li><Link to="/scholarships" className="hover:text-white transition-colors">Scholarship Checker</Link></li>
                <li>AI Chatbot</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
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