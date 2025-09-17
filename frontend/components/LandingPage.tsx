import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp, X } from 'lucide-react';

// You will need to import your images and videos.
// Make sure the paths are correct based on your project structure.
// Assuming your assets are in `src/images/` and `src/videos/`
import promoImage from '../images/image1.png';
import statsImage from '../images/image2.png';
import heroVideo from '../videos/video1.mp4';
import ctaImage from '../images/image3.png';

// New imports
import textureImage from '../images/image4.png';
import successImage from '../images/image5.png';
import videoChatbot from '../videos/video2.mp4';
import videoTracker from '../videos/video3.mp4';


// Component for the promotional banner
const PromoBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 text-white text-center py-2 px-4 flex justify-center items-center gap-4 relative z-50"
    >
      <p className="text-sm md:text-base font-medium">
        🎉 Get personalized career advice from our AI chatbot now!
      </p>
      <Link 
        to="/auth" 
        className="text-xs md:text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full transition-colors"
      >
        Try for Free
      </Link>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-4 text-white text-xl"
      >
        <X size={20} />
      </button>
    </motion.div>
  );
};

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
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Textured background finish using image4.png */}
      <div 
        className="absolute inset-0 z-0 bg-repeat bg-fixed opacity-5" 
        style={{ backgroundImage: `url(${textureImage})` }}
      ></div>

      {/* Main content wrapper with relative z-index to stay on top of the texture */}
      <div className="relative z-10">
        <PromoBanner />
        
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

        {/* Hero Section with Video Background */}
        <section className="relative py-20 px-4 bg-gray-900 overflow-hidden">
          <video 
            className="absolute inset-0 w-full h-full object-cover opacity-30" 
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
          />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Your <span className="text-blue-400">Career Journey</span> Starts Here
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
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
        </section>

        {/* Stats Section with Image */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="md:w-1/3"
            >
              <img 
                src={statsImage} 
                alt="Students succeeding" 
                className="w-full rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* New Video Showcase Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Watch Our Platform in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our tools can simplify your career journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <video src={videoChatbot} autoPlay loop muted className="w-full" />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center p-4">
                <p className="text-white text-xl font-semibold text-center">
                  AI Chatbot
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <video src={videoTracker} autoPlay loop muted className="w-full" />
              <div className="absolute inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center p-4">
                <p className="text-white text-xl font-semibold text-center">
                  Application Tracker
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with new image5.png */}
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
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
              
              {/* Image5.png inserted here */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-2 lg:col-span-3 h-96 w-full overflow-hidden rounded-xl shadow-lg"
              >
                <img src={successImage} alt="Career success journey" className="w-full h-full object-cover" />
              </motion.div>

              {features.slice(3, 6).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Image */}
        <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={ctaImage} alt="Abstract background" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
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
    </div>
  );
}