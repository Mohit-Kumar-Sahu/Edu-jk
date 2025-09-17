import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Award, Users, BookOpen, TrendingUp, X, Sparkles, Zap, DollarSign, CheckCircle, Lightbulb, TrendingUp as TrendingIcon, Trophy } from 'lucide-react';
import { useLocalization } from '../hooks/useLocalization'; // Import the localization hook
import LanguageSwitcher from '../components/LanguageSwitcher'; // Import the LanguageSwitcher component

// You will need to import your images and videos.
// Make sure the paths are correct based on your project structure.
import promoImage from '../images/image1.png'; 
import statsImage from '../images/image2.png'; 
import heroVideo from '../videos/video1.mp4';
import ctaImage from '../images/image3.png';
import videoChatbot from '../videos/video2.mp4';
import videoTracker from '../videos/video3.mp4';
// Note: image4.png and image5.png have been permanently removed as requested.

// Define a monochromatic blue color palette for uniformity
const primaryBlue = '#2563eb'; // A strong, vibrant blue
const lightBlue = '#eff6ff'; // Very light for backgrounds
const darkBlue = '#1e3a8a'; // Darker for accents/buttons
const accentGray = '#1f2937'; // For text that needs to stand out on light bg
const textGray = '#4b5563'; // For general body text
const bgColor = '#ffffff'; // The main background color for the page

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
  const { t } = useLocalization(); // Use the t() function

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: darkBlue }}
      className="text-white text-center py-3 px-4 flex justify-center items-center gap-4 relative z-50 shadow-md"
    >
      <p className="text-base md:text-lg font-semibold flex items-center">
        {t('landingPage.promo')}
      </p>
      <Link 
        to="/auth" 
        className="text-sm md:text-base bg-white text-blue-800 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors font-bold shadow-sm"
      >
        {t('landingPage.promo_button')} <Sparkles size={16} className="inline-block ml-1" />
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
  const { t } = useLocalization(); // Get the t function here

  // Define the arrays inside the component body
  const features = [
    {
      image: promoImage,
      icon: <GraduationCap className="w-8 h-8" />,
      title: t("landingPage.feat_guidance_title"),
      description: t("landingPage.feat_guidance_desc")
    },
    {
      image: statsImage,
      icon: <MapPin className="w-8 h-8" />,
      title: t("landingPage.feat_colleges_title"),
      description: t("landingPage.feat_colleges_desc")
    },
    {
      image: ctaImage,
      icon: <Award className="w-8 h-8" />,
      title: t("landingPage.feat_scholarship_title"),
      description: t("landingPage.feat_scholarship_desc")
    },
    {
      image: promoImage,
      icon: <Users className="w-8 h-8" />,
      title: t("landingPage.feat_chatbot_title"),
      description: t("landingPage.feat_chatbot_desc")
    },
    {
      image: statsImage,
      icon: <BookOpen className="w-8 h-8" />,
      title: t("landingPage.feat_tracker_title"),
      description: t("landingPage.feat_tracker_desc")
    },
    {
      image: ctaImage,
      icon: <TrendingUp className="w-8 h-8" />,
      title: t("landingPage.feat_resume_title"),
      description: t("landingPage.feat_resume_desc")
    }
  ];

  const stats = [
    { number: "142", label: t("landingPage.stat_142"), icon: <MapPin size={24} /> },
    { number: "50+", label: t("landingPage.stat_50+"), icon: <TrendingIcon size={24} /> },
    { number: "25+", label: t("landingPage.stat_25+"), icon: <DollarSign size={24} /> },
    { number: "100%", label: t("landingPage.stat_100%"), icon: <CheckCircle size={24} /> }
  ];

  const howItWorks = [
    {
      image: promoImage,
      icon: <Lightbulb size={48} />,
      title: t("landingPage.step_discover_title"),
      description: t("landingPage.step_discover_desc")
    },
    {
      image: statsImage,
      icon: <TrendingIcon size={48} />,
      title: t("landingPage.step_plan_title"),
      description: t("landingPage.step_plan_desc")
    },
    {
      image: ctaImage,
      icon: <Trophy size={48} />,
      title: t("landingPage.step_achieve_title"),
      description: t("landingPage.step_achieve_desc")
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* No textured background image, just a clean color */}
      
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
                  <h1 className="text-xl font-bold" style={{ color: accentGray }}>Edu2Career J&K</h1>
                  <p className="text-xs" style={{ color: textGray }}>{t('landingPage.header_tagline')}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex space-x-4"
              >
                <LanguageSwitcher /> {/* <-- Add the language switcher here */}
                <Link 
                  to="/auth"
                  className="px-4 py-2 hover:text-gray-900 transition-colors font-medium" style={{ color: primaryBlue }}
                >
                  {t('landingPage.login')}
                </Link>
                <Link 
                  to="/auth"
                  className="px-6 py-2 text-white rounded-lg hover:brightness-110 transition-colors font-semibold shadow-md" style={{ backgroundColor: primaryBlue }}
                >
                  {t('landingPage.get_started')}
                </Link>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section with Video & Highlighted Text */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[70vh] flex items-center justify-center text-center">
          {/* Background video that fills the section without cropping */}
          <video 
            className="absolute inset-0 w-full h-full object-cover" 
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline
          />
          
          {/* A dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

          {/* Text and CTAs placed directly over the video */}
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('landingPage.hero_title').split(' ')[0]} <span style={{ color: primaryBlue }}>{t('landingPage.hero_title').split(' ').slice(1, 3).join(' ')}</span> {t('landingPage.hero_title').split(' ').slice(3).join(' ')}
              </h1>
              <p className="text-xl text-white mb-8 max-w-lg mx-auto">
                {t('landingPage.hero_subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/auth"
                  className="px-8 py-4 text-white rounded-lg text-lg font-semibold hover:brightness-110 transition-colors shadow-lg flex items-center justify-center" style={{ backgroundColor: primaryBlue }}
                >
                  {t('landingPage.hero_cta')} <Sparkles size={20} className="ml-2" />
                </Link>
                <button 
                  className="px-8 py-4 border-2 rounded-lg text-lg font-semibold hover:bg-opacity-10 transition-colors flex items-center justify-center" 
                  style={{ borderColor: primaryBlue, color: primaryBlue, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {t('landingPage.hero_demo_cta')} <Zap size={20} className="ml-2" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section - with clean background */}
        <section className="py-16" style={{ backgroundColor: lightBlue }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto px-4 text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: accentGray }}>
              {t('landingPage.stats_title')}
            </h2>
            <p className="text-xl mt-2" style={{ color: textGray }}>
              {t('landingPage.stats_subtitle')}
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
                  <div className="text-3xl md:text-4xl font-bold" style={{ color: accentGray }}>
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base" style={{ color: textGray }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* "How It Works" Section - with images in cards */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: accentGray }}>
              {t('landingPage.how_it_works_title')}
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              {t('landingPage.how_it_works_subtitle')}
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

        {/* Video Showcase Section - with full-width, non-overlapping cards */}
        <section className="py-20 px-4" style={{ backgroundColor: lightBlue }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: accentGray }}>
              {t('landingPage.video_chatbot_title')}
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              {t('landingPage.video_chatbot_desc')}
            </p>
          </motion.div>
          <div className="grid gap-16 max-w-7xl mx-auto">
            {/* First Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <video src={videoChatbot} autoPlay loop muted playsInline className="w-full h-auto" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: primaryBlue }}>{t('landingPage.video_chatbot_title')}</h3>
                <p className="text-base" style={{ color: textGray }}>
                  {t('landingPage.video_chatbot_desc')}
                </p>
              </div>
            </motion.div>

            {/* Second Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <video src={videoTracker} autoPlay loop muted playsInline className="w-full h-auto" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2" style={{ color: primaryBlue }}>{t('landingPage.video_tracker_title')}</h3>
                <p className="text-base" style={{ color: textGray }}>
                  {t('landingPage.video_tracker_desc')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - with images in cards */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-7xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: accentGray }}>
              {t('landingPage.features_title')}
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: textGray }}>
              {t('landingPage.features_subtitle')}
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
                  <h3 className="text-xl font-semibold mb-3" style={{ color: accentGray }}>{feature.title}</h3>
                  <p className="text-base" style={{ color: textGray }}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section with a Clean Background */}
        <section className="py-20 px-4 relative" style={{ backgroundColor: primaryBlue }}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                {t('landingPage.cta_title')}
              </h2>
              <p className="text-xl mb-8 text-white opacity-90">
                {t('landingPage.cta_subtitle')}
              </p>
              <Link 
                to="/auth"
                className="inline-block px-8 py-4 bg-white text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center mx-auto max-w-xs" style={{ color: primaryBlue }}
              >
                {t('landingPage.cta_button')} <Sparkles size={20} className="ml-2" />
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
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: primaryBlue }}>
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold">Edu2Career J&K</span>
                </div>
                <p className="text-sm" style={{ color: lightBlue }}>
                  {t('landingPage.footer_tagline')}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryBlue }}>{t('landingPage.quick_links')}</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/auth" className="hover:text-white transition-colors" style={{ color: lightBlue }}>{t('landingPage.footer_get_started')}</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors" style={{ color: lightBlue }}>{t('landingPage.footer_about')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors" style={{ color: lightBlue }}>{t('landingPage.footer_contact')}</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryBlue }}>{t('landingPage.features')}</h4>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_career_quiz')}</li>
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_college_locator')}</li>
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_scholarship_checker')}</li>
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_ai_chatbot')}</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4" style={{ color: primaryBlue }}>{t('landingPage.support')}</h4>
                <ul className="space-y-2 text-sm">
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_help_center')}</li>
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_privacy')}</li>
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_terms')}</li>
                  <li style={{ color: lightBlue }}>{t('landingPage.footer_feedback')}</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm" style={{ borderColor: textGray, color: lightBlue }}>
              <p>{t('landingPage.copyright')}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}