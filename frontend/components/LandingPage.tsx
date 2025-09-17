import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp, X, Sparkles, Zap, DollarSign, CheckCircle } from 'lucide-react';

// You will need to import your images and videos.
// Make sure the paths are correct based on your project structure.
// Assuming your assets are in `src/assets/images/` and `src/assets/videos/`
import promoImage from '../images/image1.png'; // Example image for hero or general promo
import statsImage from '../images/image2.png'; // Example image for stats section
import heroVideo from '../videos/video1.mp4'; // Main hero background video
import ctaImage from '../images/image3.png'; // CTA section background image

// New imports
import textureImage from '../images/image4.png'; // Subtle page background texture
import successImage from '../images/image5.png'; // Image for a visual break in features
import videoChatbot from '../videos/video2.mp4'; // Video for AI Chatbot showcase
import videoTracker from '../videos/video3.mp4'; // Video for Application Tracker showcase

// Define a consistent color palette with turquoise focus
const primaryTurquoise = '#20c997'; // A vibrant turquoise
const lightTurquoise = '#e6fff7'; // Very light for backgrounds
const darkTurquoise = '#16916b'; // Darker for accents/buttons
const accentGray = '#4a5568'; // For text that needs to stand out on light bg
const textGray = '#6b7280'; // For general body text
const bgColor = '#f8fafc'; // Off-white for overall page background

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Component for the promotional banner (Enhanced)
const PromoBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: darkTurquoise }}
      className="text-white text-center py-3 px-4 flex justify-center items-center gap-4 relative z-50 shadow-md"
    >
      <p className="text-base md:text-lg font-semibold flex items-center">
        ✨ Unlock Your Future! Get FREE personalized career guidance today! 🚀
      </p>
      <Link 
        to="/auth" 
        className="text-sm md:text-base bg-white text-blue-800 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors font-bold shadow-sm"
      >
        Start Now <Sparkles size={16} className="inline-block ml-1" />
      </Link>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-4 text-white hover:text-gray-200 transition-colors"
      >
        <X size={24} />
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
    { number: "142", label: "Government Colleges", icon: <MapPin size={24} /> },
    { number: "50+", label: "Career Paths", icon: <TrendingUp size={24} /> },
    { number: "25+", label: "Scholarship Schemes", icon: <DollarSign size={24} /> },
    { number: "100%", label: "Free for Students", icon: <CheckCircle size={24} /> }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Textured background finish using image4.png */}
      <div 
        className="absolute inset-0 z-0 bg-repeat bg-fixed opacity-5 pointer-events-none" 
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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryTurquoise }}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Edu2Career J&K</h1>
                  <p className="text-xs" style={{ color: textGray }}>Career & Education Navigator</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex space-x-4"
              >
                <Link 
                  to="/auth"
                  className="px-4 py-2 hover:text-gray-900 transition-colors font-medium" style={{ color: primaryTurquoise }}
                >
                  Login
                </Link>
                <Link 
                  to="/auth"
                  className="px-6 py-2 text-white rounded-lg hover:brightness-110 transition-colors font-semibold shadow-md" style={{ backgroundColor: primaryTurquoise }}
                >
                  Get Started ✨
                </Link>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section with Video Background and Image Overlay */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[70vh] flex items-center justify-center">
          <video 
            className="absolute inset-0 w-full h-full object-cover opacity-20" 
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline // Added for better mobile support
          />
          
          <div className="max-w-7xl mx-auto text-center relative z-10 grid md:grid-cols-2 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: accentGray }}>
                Your <span style={{ color: primaryTurquoise }}>Career Journey</span> Starts Here 🚀
              </h1>
              <p className="text-xl mb-8 max-w-lg" style={{ color: textGray }}>
                One-stop personalized career & education advisor for students in Jammu & Kashmir. 
                Discover your path, find the right college, and unlock your potential. 🌟
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/auth"
                  className="px-8 py-4 text-white rounded-lg text-lg font-semibold hover:brightness-110 transition-colors shadow-lg flex items-center justify-center" style={{ backgroundColor: primaryTurquoise }}
                >
                  Start Your Journey <Sparkles size={20} className="ml-2" />
                </Link>
                <button 
                  className="px-8 py-4 border-2 rounded-lg text-lg font-semibold hover:bg-opacity-10 transition-colors flex items-center justify-center" 
                  style={{ borderColor: primaryTurquoise, color: primaryTurquoise }}
                >
                  Watch Demo <Zap size={20} className="ml-2" />
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:block" // Hide on small screens
            >
              <img 
                src={promoImage} 
                alt="Students achieving success" 
                className="w-full h-auto object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats Section with Dedicated Cards and Image */}
        <section className="py-16" style={{ backgroundColor: lightTurquoise }}>
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            {/* Stats content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="mb-3" style={{ color: primaryTurquoise }}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: accentGray }}>
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base" style={{ color: textGray }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="md:w-1/3 flex-shrink-0"
            >
              <img 
                src={statsImage} 
                alt="Students collaborating" 
                className="w-full rounded-xl shadow-lg object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* New Video Showcase Section - Enhanced UI */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: accentGray }}>
              See Edu2Career J&K in Action! 🎬
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              Explore interactive demos of our most powerful features.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <video src={videoChatbot} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: primaryTurquoise }}>AI Career Chatbot 🤖</h3>
                <p className="text-base" style={{ color: textGray }}>
                  Get instant answers and personalized guidance for your career questions in multiple languages.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <video src={videoTracker} autoPlay loop muted playsInline className="w-full h-auto object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: primaryTurquoise }}>Application Tracker 📝</h3>
                <p className="text-base" style={{ color: textGray }}>
                  Seamlessly apply to colleges with auto-filled forms and monitor your application status in real-time.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with new image5.png - Outstanding Design */}
        <section className="py-20 px-4" style={{ backgroundColor: lightTurquoise }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: accentGray }}>
              Unleash Your Potential with Our Core Features! 🌟
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              Everything you need to navigate your academic and career path with confidence.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 border-b-4"
                style={{ borderColor: primaryTurquoise }}
              >
                <div className="mb-4" style={{ color: primaryTurquoise }}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: accentGray }}>{feature.title}</h3>
                <p className="text-base" style={{ color: textGray }}>{feature.description}</p>
              </motion.div>
            ))}
            
            {/* Image5.png inserted here as a full-width compelling visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="md:col-span-2 lg:col-span-3 h-96 w-full overflow-hidden rounded-xl shadow-2xl my-8"
            >
              <img src={successImage} alt="Students celebrating career success" className="w-full h-full object-cover" />
            </motion.div>

            {features.slice(3, 6).map((feature, index) => (
              <motion.div
                key={index + 3} // Unique key
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white p-8 rounded-xl shadow-lg transition-all duration-300 border-b-4"
                style={{ borderColor: primaryTurquoise }}
              >
                <div className="mb-4" style={{ color: primaryTurquoise }}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: accentGray }}>{feature.title}</h3>
                <p className="text-base" style={{ color: textGray }}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section with Image and Vibrant Colors */}
        <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: primaryTurquoise }}>
          <div className="absolute inset-0 opacity-10">
            <img src={ctaImage} alt="Abstract background texture" className="w-full h-full object-cover" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Discover Your Perfect Career Path? 🌟
              </h2>
              <p className="text-xl mb-8 text-white opacity-90">
                Join thousands of J&K students who have already found their direction and success with Edu2Career J&K! 🎓
              </p>
              <Link 
                to="/auth"
                className="inline-block px-8 py-4 bg-white text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center mx-auto max-w-xs" style={{ color: primaryTurquoise }}
              >
                Start Free Today <Sparkles size={20} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12" style={{ backgroundColor: accentGray }}>
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryTurquoise }}>
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold">Edu2Career J&K</span>
                </div>
                <p className="text-sm" style={{ color: lightTurquoise }}>
                  Empowering students in Jammu & Kashmir with personalized career guidance and educational resources.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryTurquoise }}>Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/auth" className="hover:text-white transition-colors" style={{ color: lightTurquoise }}>Get Started</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors" style={{ color: lightTurquoise }}>About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors" style={{ color: lightTurquoise }}>Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryTurquoise }}>Features</h4>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: lightTurquoise }}>Career Quiz</li>
                  <li style={{ color: lightTurquoise }}>College Locator</li>
                  <li style={{ color: lightTurquoise }}>Scholarship Checker</li>
                  <li style={{ color: lightTurquoise }}>AI Chatbot</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryTurquoise }}>Support</h4>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: lightTurquoise }}>Help Center</li>
                  <li style={{ color: lightTurquoise }}>Privacy Policy</li>
                  <li style={{ color: lightTurquoise }}>Terms of Service</li>
                  <li style={{ color: lightTurquoise }}>Feedback</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm" style={{ borderColor: textGray, color: lightTurquoise }}>
              <p>&copy; 2024 Edu2Career J&K. Made with ❤️ for J&K students. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}