import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp, X, Sparkles, Zap, DollarSign, CheckCircle, Lightbulb, TrendingUp as TrendingIcon, Trophy, Heart, Briefcase, Smile } from 'lucide-react';

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
const bgColor = '#f9fafb';

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

const PromoBanner = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="promo-banner"
    >
      <p className="promo-text">
        ✨ Get started for FREE today! Your future awaits! 🚀
      </p>
      <Link to="/auth" className="promo-link">
        Start Now <Sparkles size={16} className="icon-inline" />
      </Link>
      <button onClick={() => setIsVisible(false)} className="promo-close-btn">
        <X size={24} />
      </button>
    </motion.div>
  );
};

export function LandingPage() {
  const features = [
    {
      image: promoImage,
      icon: <GraduationCap size={32} />,
      title: "Personalized Career Guidance",
      description: "Our scientifically-designed quiz based on the RIASEC model helps you discover your interests and find a tailored career path."
    },
    {
      image: statsImage,
      icon: <MapPin size={32} />,
      title: "J&K College Directory",
      description: "Browse a complete and verified directory of 142+ J&K Government Colleges with detailed information on courses, ratings, and contact details."
    },
    {
      image: ctaImage,
      icon: <Award size={32} />,
      title: "Scholarship Checker",
      description: "Automatically check your eligibility for top schemes like PMSSS, NSP, and J&K state scholarships, so you never miss an opportunity."
    },
    {
      image: promoImage,
      icon: <Users size={32} />,
      title: "AI Career Chatbot",
      description: "Get instant, reliable answers to your career questions in English, Hindi, and Urdu with our powerful AI-powered chatbot."
    },
    {
      image: statsImage,
      icon: <BookOpen size={32} />,
      title: "Application Tracker",
      description: "Streamline your college applications with auto-filled forms and track the status of all your applications in one organized place."
    },
    {
      image: ctaImage,
      icon: <TrendingUp size={32} />,
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
    <div className="landing-page-container">
      <style>
        {`
          /* Color Palette */
          :root {
            --primary-blue: #3b82f6;
            --light-blue: #eff6ff;
            --dark-blue: #1e3a8a;
            --accent-blue: #2563eb;
            --text-gray: #6b7280;
            --bg-color: #f9fafb;
          }

          /* Global Styles */
          .landing-page-container {
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            background-color: var(--bg-color);
          }

          .background-texture {
            position: absolute;
            inset: 0;
            z-index: 0;
            background-image: url(${textureImage});
            background-repeat: repeat;
            background-attachment: fixed;
            opacity: 0.05;
            pointer-events: none;
          }

          .main-content {
            position: relative;
            z-index: 10;
          }

          .container {
            max-width: 1280px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .section-padding {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }

          .text-center { text-align: center; }

          /* Promo Banner */
          .promo-banner {
            background-color: var(--accent-blue);
            color: white;
            text-align: center;
            padding: 0.75rem 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            position: relative;
            z-index: 50;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .promo-text {
            font-size: 1rem;
            font-weight: 600;
            display: flex;
            align-items: center;
          }

          .promo-link {
            font-size: 0.875rem;
            background-color: white;
            color: #1f357f;
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            transition-property: background-color;
            font-weight: 700;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .promo-close-btn {
            position: absolute;
            right: 1rem;
            color: white;
            transition-property: color;
          }
          .promo-close-btn:hover { color: #e5e7eb; }

          .icon-inline {
            display: inline-block;
            margin-left: 0.25rem;
          }

          @media (min-width: 768px) {
            .promo-text { font-size: 1.125rem; }
            .promo-link { font-size: 1rem; }
          }

          /* Header */
          .header {
            background-color: white;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
          }

          .header-logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .logo-icon-bg {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-blue);
          }

          .logo-title { color: var(--dark-blue); font-size: 1.25rem; font-weight: 700; }
          .logo-subtitle { color: var(--text-gray); font-size: 0.75rem; }

          .header-links { display: flex; gap: 1rem; }

          .header-link {
            padding: 0.5rem 1rem;
            color: var(--primary-blue);
            font-weight: 500;
            transition-property: color;
          }
          .header-link:hover { color: #111827; }

          .header-cta {
            padding: 0.5rem 1.5rem;
            color: white;
            background-color: var(--primary-blue);
            border-radius: 0.5rem;
            font-weight: 600;
            transition-property: filter;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header-cta:hover { filter: brightness(1.1); }

          /* Hero Section */
          .hero-section { position: relative; padding: 5rem 1rem; }

          .hero-content {
            display: grid;
            gap: 3rem;
            align-items: center;
          }

          @media (min-width: 768px) {
            .hero-content { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .hero-img-container { display: block; }
            .hero-img-container img {
              max-width: 100%;
              height: auto;
              border-radius: 0.75rem;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
          }

          .hero-text { text-align: left; }

          .hero-title {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--dark-blue);
          }
          .hero-title-span { color: var(--primary-blue); }
          .hero-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            max-width: 32rem;
            color: var(--text-gray);
          }
          .hero-cta-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          @media (min-width: 640px) {
            .hero-cta-group { flex-direction: row; }
          }

          .hero-primary-cta {
            padding: 1rem 2rem;
            color: white;
            background-color: var(--primary-blue);
            border-radius: 0.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            transition-property: filter;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .hero-primary-cta:hover { filter: brightness(1.1); }

          .hero-secondary-cta {
            padding: 1rem 2rem;
            border-width: 2px;
            border-radius: 0.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            transition-property: background-color;
            display: flex;
            align-items: center;
            justify-content: center;
            border-color: var(--primary-blue);
            color: var(--primary-blue);
          }
          .hero-secondary-cta:hover { background-color: var(--light-blue); }
          .hero-secondary-cta svg, .hero-primary-cta svg { margin-left: 0.5rem; }

          /* Stats Section */
          .stats-section { padding-top: 4rem; padding-bottom: 4rem; }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
          }

          @media (min-width: 1024px) {
            .stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }

          .stat-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            transition-property: all;
          }
          .stat-card:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .stat-icon { margin-bottom: 0.75rem; color: var(--primary-blue); }
          .stat-number {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--dark-blue);
          }
          @media (min-width: 768px) {
            .stat-number { font-size: 2.25rem; }
          }
          .stat-label { font-size: 0.875rem; color: var(--text-gray); }
          @media (min-width: 768px) {
            .stat-label { font-size: 1rem; }
          }

          /* How It Works and Features Section */
          .card-grid {
            display: grid;
            gap: 2rem;
          }
          @media (min-width: 768px) {
            .card-grid-2-col { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .card-grid-3-col { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }

          .feature-card {
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition-property: all;
            overflow: hidden;
          }
          .feature-card:hover {
            transform: translateY(-0.5rem);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .feature-card img { width: 100%; height: 12rem; object-fit: cover; }
          .feature-card-content {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .feature-card-icon-wrapper {
            margin-bottom: 1rem;
            display: inline-block;
            padding: 1rem;
            border-radius: 9999px;
            color: var(--primary-blue);
            background-color: var(--light-blue);
          }
          .feature-card-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: var(--primary-blue);
          }
          .feature-card-description {
            font-size: 1rem;
            color: var(--text-gray);
          }

          /* Video Showcase */
          .video-card {
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition-property: box-shadow;
          }
          .video-card:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
          .video-card video { width: 100%; height: auto; }
          .video-card-content { padding: 1.5rem; }
          .video-card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--primary-blue);
          }
          .video-card-description {
            font-size: 1rem;
            color: var(--text-gray);
          }

          /* Testimonials */
          .testimonial-card {
            background-color: white;
            border-radius: 0.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition-property: all;
          }
          .testimonial-card:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
          .testimonial-quote {
            font-size: 1.25rem;
            font-style: italic;
            margin-bottom: 1rem;
            color: var(--dark-blue);
          }
          .testimonial-name {
            font-weight: 700;
            margin-bottom: 0.25rem;
            color: var(--primary-blue);
          }
          .testimonial-role {
            font-size: 0.875rem;
            color: var(--text-gray);
          }

          /* CTA Section */
          .cta-section {
            padding: 5rem 1rem;
            position: relative;
            overflow: hidden;
            background-color: var(--primary-blue);
          }
          .cta-bg-texture {
            position: absolute;
            inset: 0;
            opacity: 0.1;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cta-content {
            max-width: 56rem;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          .cta-title {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: white;
          }
          @media (min-width: 768px) {
            .cta-title { font-size: 2.25rem; }
          }
          .cta-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            color: white;
            opacity: 0.9;
          }
          .cta-link {
            display: inline-flex;
            padding: 1rem 2rem;
            background-color: white;
            font-size: 1.125rem;
            font-weight: 600;
            border-radius: 0.5rem;
            transition-property: background-color;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            align-items: center;
            justify-content: center;
            margin-left: auto;
            margin-right: auto;
            max-width: 20rem;
            color: var(--primary-blue);
          }
          .cta-link:hover { background-color: #f3f4f6; }
          .cta-link svg { margin-left: 0.5rem; }

          /* Footer */
          .footer {
            padding-top: 3rem;
            padding-bottom: 3rem;
            background-color: var(--dark-blue);
            color: white;
          }
          .footer-grid {
            display: grid;
            gap: 2rem;
          }
          @media (min-width: 768px) {
            .footer-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }
          .footer-logo-group { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
          .footer-logo-title { font-size: 1.125rem; font-weight: 600; }
          .footer-logo-icon-bg {
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-blue);
          }
          .footer-text { font-size: 0.875rem; color: var(--light-blue); }
          .footer-heading {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--primary-blue);
          }
          .footer-link-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            font-size: 0.875rem;
          }
          .footer-link {
            color: var(--light-blue);
            transition-property: color;
          }
          .footer-link:hover { color: white; }
          .footer-line {
            border-top-width: 1px;
            margin-top: 2rem;
            padding-top: 2rem;
            text-align: center;
            font-size: 0.875rem;
            border-color: #4b5563;
            color: var(--light-blue);
          }
          .footer-heart { display: inline-block; color: #ef4444; }
        `}
      </style>

      <div className="background-texture"></div>

      <div className="main-content">
        <PromoBanner />
        
        <header className="header">
          <div className="container">
            <div className="header-content">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="header-logo">
                <div className="logo-icon-bg">
                  <GraduationCap size={24} color="white" />
                </div>
                <div>
                  <h1 className="logo-title">Edu2Career J&K</h1>
                  <p className="logo-subtitle">Career & Education Navigator</p>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="header-links">
                <Link to="/auth" className="header-link">Login</Link>
                <Link to="/auth" className="header-cta">Get Started ✨</Link>
              </motion.div>
            </div>
          </div>
        </header>

        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-text">
                <h1 className="hero-title">
                  Your <span className="hero-title-span">Career Journey</span> Starts Here 🚀
                </h1>
                <p className="hero-subtitle">
                  One-stop personalized career & education advisor for students in Jammu & Kashmir. Discover your path, find the right college, and unlock your potential. 🌟
                </p>
                <div className="hero-cta-group">
                  <Link to="/auth" className="hero-primary-cta">
                    Start Your Journey <Sparkles size={20} />
                  </Link>
                  <button className="hero-secondary-cta">
                    Watch Demo <Zap size={20} />
                  </button>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hero-img-container">
                <img src={promoImage} alt="Students achieving success" />
              </motion.div>
            </div>
          </div>
        </section>
        
        ---
        
        <section className="stats-section">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="container text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="hero-title">Facts and Figures</h2>
            <p className="hero-subtitle">Our platform's reach and impact at a glance.</p>
          </motion.div>
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        ---
        
        <section className="section-padding" style={{ backgroundColor: lightBlue }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="container text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="hero-title">Your Success, Our Simple Process</h2>
            <p className="hero-subtitle">We've broken down your career journey into three simple, powerful steps.</p>
          </motion.div>
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="card-grid card-grid-3-col">
              {howItWorks.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="feature-card">
                  <img src={step.image} alt={step.title} />
                  <div className="feature-card-content">
                    <div className="feature-card-icon-wrapper">{step.icon}</div>
                    <h3 className="feature-card-title">{step.title}</h3>
                    <p className="feature-card-description">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        ---
        
        <section className="section-padding">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="container text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="hero-title">See Our Platform in Action! 🎬</h2>
            <p className="hero-subtitle">Explore interactive demos of our most powerful features.</p>
          </motion.div>
          <div className="container">
            <div className="card-grid" style={{ gap: '4rem' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true, amount: 0.5 }} className="video-card">
                <video src={videoChatbot} autoPlay loop muted playsInline />
                <div className="video-card-content">
                  <h3 className="video-card-title">AI Career Chatbot 🤖</h3>
                  <p className="video-card-description">Get instant answers and personalized guidance for your career questions in multiple languages.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true, amount: 0.5 }} className="video-card">
                <video src={videoTracker} autoPlay loop muted playsInline />
                <div className="video-card-content">
                  <h3 className="video-card-title">Application Tracker 📝</h3>
                  <p className="video-card-description">Seamlessly apply to colleges with auto-filled forms and monitor your application status in real-time.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        ---
        
        <section className="section-padding" style={{ backgroundColor: lightBlue }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="container text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="hero-title">Unleash Your Potential with Our Core Features! 🌟</h2>
            <p className="hero-subtitle">Everything you need to navigate your academic and career path with confidence.</p>
          </motion.div>
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="card-grid card-grid-3-col">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="feature-card">
                  <img src={feature.image} alt={feature.title} />
                  <div className="feature-card-content">
                    <div className="feature-card-icon-wrapper">{feature.icon}</div>
                    <h3 className="feature-card-title" style={{ color: darkBlue }}>{feature.title}</h3>
                    <p className="feature-card-description">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        ---
        
        <section className="section-padding">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="container text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="hero-title">Hear From Our Happy Students 😊</h2>
            <p className="hero-subtitle">Real stories from students in J&K who found their path.</p>
          </motion.div>
          <div className="container">
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="card-grid card-grid-2-col">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={itemVariants} className="testimonial-card">
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <p className="testimonial-name">- {testimonial.name}</p>
                  <p className="testimonial-role">{testimonial.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        ---
        
        <section className="cta-section">
          <img src={ctaImage} alt="Abstract background texture" className="cta-bg-texture" />
          <div className="cta-content">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}>
              <h2 className="cta-title">Ready to Discover Your Perfect Career Path? 🌟</h2>
              <p className="cta-subtitle">
                Join thousands of J&K students who have already found their direction and success with Edu2Career J&K! 🎓
              </p>
              <Link to="/auth" className="cta-link">
                Start Free Today <Sparkles size={20} />
              </Link>
            </motion.div>
          </div>
        </section>
        
        ---
        
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="footer-logo-group">
                  <div className="footer-logo-icon-bg">
                    <GraduationCap size={20} color="white" />
                  </div>
                  <span className="footer-logo-title">Edu2Career J&K</span>
                </div>
                <p className="footer-text">
                  Empowering students in Jammu & Kashmir with personalized career guidance and educational resources.
                </p>
              </div>
              
              <div>
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-link-list">
                  <li><Link to="/auth" className="footer-link">Get Started</Link></li>
                  <li><a href="#" className="footer-link">About Us</a></li>
                  <li><a href="#" className="footer-link">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="footer-heading">Features</h4>
                <ul className="footer-link-list">
                  <li className="footer-text">Career Quiz</li>
                  <li className="footer-text">College Locator</li>
                  <li className="footer-text">Scholarship Checker</li>
                  <li className="footer-text">AI Chatbot</li>
                </ul>
              </div>
              
              <div>
                <h4 className="footer-heading">Support</h4>
                <ul className="footer-link-list">
                  <li className="footer-text">Help Center</li>
                  <li className="footer-text">Privacy Policy</li>
                  <li className="footer-text">Terms of Service</li>
                  <li className="footer-text">Feedback</li>
                </ul>
              </div>
            </div>
            
            <div className="footer-line">
              <p>&copy; 2024 Edu2Career J&K. Made with <Heart size={14} className="footer-heart" /> for J&K students. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
