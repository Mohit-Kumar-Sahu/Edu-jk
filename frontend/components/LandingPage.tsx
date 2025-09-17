import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp, X, Sparkles, Zap, DollarSign, CheckCircle, Lightbulb, TrendingUp as TrendingIcon, Trophy, Heart, Briefcase, Smile, Check } from 'lucide-react';

// Import all necessary images and videos.
import promoImage from '../images/image1.png'; 
import statsImage from '../images/image2.png'; 
import heroVideo from '../videos/video1.mp4';
import ctaImage from '../images/image3.png';
import textureImage from '../images/image4.png';
import videoChatbot from '../videos/video2.mp4';
import videoTracker from '../videos/video3.mp4';

// A new, professional blue and gray color palette
const primaryBlue = '#3b82f6'; 
const lightBlue = '#eff6ff'; 
const darkBlue = '#1e3a8a'; 
const accentBlue = '#2563eb';
const textGray = '#6b7280';
const bgColor = '#f9fafb'; // Very light gray for background

// Animation variants for a consistent, professional feel
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

// Component for the enhanced promotional banner
const PromoBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: accentBlue }}
      className="text-white text-center py-3 px-4 flex justify-center items-center gap-4 relative z-50 shadow-md"
    >
      <p className="text-base md:text-lg font-semibold flex items-center">
        ✨ Get started for FREE today! Your future awaits! 🚀
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
  // Refactored features to have a more descriptive title and description
  const features = [
    {
      image: promoImage,
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Personalized Career Guidance",
      description: "Our scientifically-designed quiz based on the RIASEC model helps you discover your interests and find a tailored career path."
    },
    {
      image: statsImage,
      icon: <MapPin className="w-8 h-8" />,
      title: "J&K College Directory",
      description: "Browse a complete and verified directory of 142+ J&K Government Colleges with detailed information on courses, ratings, and contact details."
    },
    {
      image: ctaImage,
      icon: <Award className="w-8 h-8" />,
      title: "Scholarship Checker",
      description: "Automatically check your eligibility for top schemes like PMSSS, NSP, and J&K state scholarships, so you never miss an opportunity."
    },
    {
      image: promoImage,
      icon: <Users className="w-8 h-8" />,
      title: "AI Career Chatbot",
      description: "Get instant, reliable answers to your career questions in English, Hindi, and Urdu with our powerful AI-powered chatbot."
    },
    {
      image: statsImage,
      icon: <BookOpen className="w-8 h-8" />,
      title: "Application Tracker",
      description: "Streamline your college applications with auto-filled forms and track the status of all your applications in one organized place."
    },
    {
      image: ctaImage,
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Resume Builder",
      description: "Quickly and easily generate a professional, polished PDF resume from your profile to impress future employers and universities."
    }
  ];

  const stats = [
    { number: "142+", label: "Government Colleges", icon: <MapPin size={24} /> },
    { number: "50+", label: "Career Paths", icon: <Briefcase size={24} /> },
    { number: "25+", label: "Scholarship Schemes", icon: <DollarSign size={24} /> },
    { number: "100%", label: "Free for Students", icon: <CheckCircle size={24} /> }
  ];

  const howItWorks = [
    {
      image: promoImage,
      icon: <Lightbulb size={48} />,
      title: "Discover",
      description: "Start with our personalized quiz to explore your interests and find your perfect career path."
    },
    {
      image: statsImage,
      icon: <TrendingIcon size={48} />,
      title: "Plan",
      description: "Access our comprehensive college and scholarship databases to plan your academic journey."
    },
    {
      image: ctaImage,
      icon: <Trophy size={48} />,
      title: "Achieve",
      description: "Use our AI chatbot and application tracker to streamline your process and reach your goals."
    }
  ];

  // New testimonial section data
  const testimonials = [
    {
      quote: "Edu2Career J&K helped me find the perfect college and scholarship. The AI chatbot was a game-changer for my application process!",
      name: "Aisha Khan",
      role: "Student, Government College for Women, Srinagar"
    },
    {
      quote: "The career quiz was incredibly accurate and gave me clarity. I highly recommend this platform to every student in J&K.",
      name: "Rahul Sharma",
      role: "Aspiring Engineer"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Textured background finish that won't interfere with content */}
      <div 
        className="absolute inset-0 z-0 bg-repeat bg-fixed opacity-5 pointer-events-none" 
        style={{ backgroundImage: `url(${textureImage})` }}
      ></div>

      {/* Main content container ensures no overlap */}
      <div className="relative z-10">
        <PromoBanner />
        
        {/* Header Section */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryBlue }}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold" style={{ color: darkBlue }}>Edu2Career J&K</h1>
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
                  className="px-4 py-2 hover:text-gray-900 transition-colors font-medium" style={{ color: primaryBlue }}
                >
                  Login
                </Link>
                <Link 
                  to="/auth"
                  className="px-6 py-2 text-white rounded-lg hover:brightness-110 transition-colors font-semibold shadow-md" style={{ backgroundColor: primaryBlue }}
                >
                  Get Started ✨
                </Link>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section with Image & CTA */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
            {/* Text and CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: darkBlue }}>
                Your <span style={{ color: primaryBlue }}>Career Journey</span> Starts Here 🚀
              </h1>
              <p className="text-xl mb-8 max-w-lg" style={{ color: textGray }}>
                One-stop personalized career & education advisor for students in Jammu & Kashmir. 
                Discover your path, find the right college, and unlock your potential. 🌟
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/auth"
                  className="px-8 py-4 text-white rounded-lg text-lg font-semibold hover:brightness-110 transition-colors shadow-lg flex items-center justify-center" style={{ backgroundColor: primaryBlue }}
                >
                  Start Your Journey <Sparkles size={20} className="ml-2" />
                </Link>
                <button 
                  className="px-8 py-4 border-2 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center" 
                  style={{ borderColor: primaryBlue, color: primaryBlue }}
                >
                  Learn More <Zap size={20} className="ml-2" />
                </button>
              </div>
            </motion.div>
            
            {/* Promo Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:block"
            >
              <img 
                src={promoImage} 
                alt="Students achieving success" 
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Full-width Video Section */}
        <section className="py-20 px-4" style={{ backgroundColor: lightBlue }}>
          <div className="max-w-7xl mx-auto text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-2" style={{ color: darkBlue }}>
              See What Sets Us Apart 🎬
            </motion.h2>
            <p className="text-xl" style={{ color: textGray }}>
              A brief overview of our platform and its features.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden"
          >
            <video 
              className="w-full h-auto" 
              src={heroVideo} 
              controls 
              playsInline
            />
          </motion.div>
        </section>

        ---

        {/* Stats Section */}
        <section className="py-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: darkBlue }}>
              Facts and Figures
            </h2>
            <p className="text-xl mt-2" style={{ color: textGray }}>
              Our platform's reach and impact at a glance.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="mb-3" style={{ color: primaryBlue }}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: darkBlue }}>
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base" style={{ color: textGray }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        ---

        {/* How It Works Section */}
        <section className="py-20 px-4" style={{ backgroundColor: lightBlue }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: darkBlue }}>
              Your Success, Our Simple Process
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              We've broken down your career journey into three simple, powerful steps.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden"
              >
                <img src={step.image} alt={step.title} className="w-full h-48 object-cover" />
                <div className="p-8 text-center flex flex-col items-center">
                  <div className="mb-4 inline-block p-4 rounded-full" style={{ color: primaryBlue, backgroundColor: lightBlue }}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: primaryBlue }}>{step.title}</h3>
                  <p className="text-base" style={{ color: textGray }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        ---

        {/* Video Showcase Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: darkBlue }}>
              See Our Platform in Action! 🎬
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              Explore interactive demos of our most powerful features.
            </p>
          </motion.div>
          <div className="grid gap-16 max-w-7xl mx-auto">
            {/* First Video Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <video src={videoChatbot} autoPlay loop muted playsInline className="w-full h-auto" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: primaryBlue }}>AI Career Chatbot 🤖</h3>
                <p className="text-base" style={{ color: textGray }}>
                  Get instant answers and personalized guidance for your career questions in multiple languages.
                </p>
              </div>
            </motion.div>

            {/* Second Video Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <video src={videoTracker} autoPlay loop muted playsInline className="w-full h-auto" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: primaryBlue }}>Application Tracker 📝</h3>
                <p className="text-base" style={{ color: textGray }}>
                  Seamlessly apply to colleges with auto-filled forms and monitor your application status in real-time.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        ---

        {/* Features Section - with outstanding card design */}
        <section className="py-20 px-4" style={{ backgroundColor: lightBlue }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: darkBlue }}>
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden"
              >
                <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="mb-4" style={{ color: primaryBlue }}>{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: darkBlue }}>{feature.title}</h3>
                  <p className="text-base" style={{ color: textGray }}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        ---

        {/* New Testimonials Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: darkBlue }}>
              Hear From Our Happy Students 😊
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              Real stories from students in J&K who found their path.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl"
              >
                <p className="text-xl italic mb-4" style={{ color: darkBlue }}>"{testimonial.quote}"</p>
                <p className="font-bold mb-1" style={{ color: primaryBlue }}>- {testimonial.name}</p>
                <p className="text-sm" style={{ color: textGray }}>{testimonial.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        ---

        {/* CTA Section with Image and Vibrant Colors */}
        <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: primaryBlue }}>
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
                className="inline-block px-8 py-4 bg-white text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center mx-auto max-w-xs" style={{ color: primaryBlue }}
              >
                Start Free Today <Sparkles size={20} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        ---

        {/* Footer */}
        <footer className="py-12" style={{ backgroundColor: darkBlue }}>
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryBlue }}>
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold">Edu2Career J&K</span>
                </div>
                <p className="text-sm" style={{ color: lightBlue }}>
                  Empowering students in Jammu & Kashmir with personalized career guidance and educational resources.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryBlue }}>Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/auth" className="hover:text-white transition-colors" style={{ color: lightBlue }}>Get Started</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors" style={{ color: lightBlue }}>About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors" style={{ color: lightBlue }}>Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryBlue }}>Features</h4>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: lightBlue }}>Career Quiz</li>
                  <li style={{ color: lightBlue }}>College Locator</li>
                  <li style={{ color: lightBlue }}>Scholarship Checker</li>
                  <li style={{ color: lightBlue }}>AI Chatbot</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryBlue }}>Support</h4>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: lightBlue }}>Help Center</li>
                  <li style={{ color: lightBlue }}>Privacy Policy</li>
                  <li style={{ color: lightBlue }}>Terms of Service</li>
                  <li style={{ color: lightBlue }}>Feedback</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm" style={{ borderColor: textGray, color: lightBlue }}>
              <p>&copy; 2024 Edu2Career J&K. Made with <Heart size={14} className="inline-block text-red-500" /> for J&K students. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
