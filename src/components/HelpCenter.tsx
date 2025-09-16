import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, ChevronDown, ChevronUp, Search, BookOpen, MessageCircle, FileText } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const categories = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Getting Started",
      description: "Learn the basics of using Edu2Career J&K",
      articles: 8
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Understanding your career assessment results",
      articles: 12
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Applications & Forms",
      description: "College applications and scholarship forms",
      articles: 6
    }
  ];

  const faqs = [
    {
      question: "How do I create my account?",
      answer: "Click on 'Get Started' or 'Login' on the homepage. Choose to sign up with email or social login (Google/Facebook). Verify your email address, and you'll be ready to use all features!"
    },
    {
      question: "What is the RIASEC career assessment?",
      answer: "RIASEC is a career assessment model that identifies your interests across six areas: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional. Our quiz helps match you with suitable careers based on your personality and interests."
    },
    {
      question: "How do I find colleges in my district?",
      answer: "Use our College Locator feature. Select your preferred district, course, and other filters. You'll see all 142 J&K government colleges with detailed information including NAAC ratings, contact details, and available courses."
    },
    {
      question: "How does the scholarship checker work?",
      answer: "Our AI-powered scholarship checker automatically verifies your eligibility for PMSSS, NSP, and J&K state schemes. Simply enter your details, and we'll show you all scholarships you qualify for with application links."
    },
    {
      question: "Can I track my college applications?",
      answer: "Yes! Use the Application Tracker to submit applications to multiple colleges with auto-filled forms. Track the status of each application, set reminders for important dates, and get notifications about updates."
    },
    {
      question: "How do I use the AI Career Chatbot?",
      answer: "The chatbot is available 24/7 in the bottom-right corner of your dashboard. Ask questions about careers, colleges, scholarships, or any other educational topics in English, Hindi, Urdu, or Kashmiri."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use industry-standard encryption and follow strict privacy policies. Your personal information is never shared with third parties, and we comply with all data protection regulations."
    },
    {
      question: "Can I use Edu2Career J&K offline?",
      answer: "Yes! Our PWA works offline. You can access previously loaded content, take quizzes, and view your saved information even without internet connection. Changes sync when you're back online."
    }
  ];

  const quickLinks = [
    { title: "Video Tutorials", description: "Step-by-step video guides", link: "#" },
    { title: "User Guide PDF", description: "Complete user manual", link: "#" },
    { title: "Troubleshooting", description: "Common issues and solutions", link: "#" },
    { title: "Contact Support", description: "Get help from our team", link: "/contact" }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Help <span className="text-blue-600">Center</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions and get the help you need to make the most of Edu2Career J&K.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our help articles organized by topic
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="text-blue-600 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  {category.articles} articles
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No results found for "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              More Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Additional help and learning resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {link.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {link.description}
                </p>
                <Link
                  to={link.link}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Our support team is here to help you succeed in your career journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </Link>
              <button className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Chat with AI Assistant
              </button>
            </div>
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
