import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, Shield, Eye, Lock, Database, Users } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export function PrivacyPolicy() {
  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, phone, educational details)",
        "Usage data and analytics to improve our services",
        "Device information for app functionality and security",
        "Location data for college recommendations (with permission)"
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "Provide personalized career guidance and college recommendations",
        "Process scholarship applications and college admissions",
        "Send important updates and notifications",
        "Improve our services through analytics and research"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: [
        "Industry-standard encryption for all data transmission",
        "Secure servers with regular security audits",
        "Access controls and employee training on data protection",
        "Regular backups and disaster recovery procedures"
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Sharing & Third Parties",
      content: [
        "We never sell your personal information to third parties",
        "Limited sharing with educational institutions for applications",
        "Analytics partners (anonymized data only)",
        "Legal compliance when required by law"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Access and review your personal data",
        "Request corrections or deletions",
        "Data portability options",
        "Opt-out of marketing communications"
      ]
    }
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: January 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Edu2Career J&K is committed to protecting your privacy and ensuring the security of your personal information.
                This privacy policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>
              <p className="mb-4">
                We are dedicated to maintaining the trust of our users, particularly students from Jammu & Kashmir who rely on us
                for career guidance and educational services. Your privacy and data security are fundamental to our mission.
              </p>
              <p>
                By using Edu2Career J&K, you agree to the collection and use of information in accordance with this policy.
                We will not use or share your information except as described in this privacy policy.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Handle Your Data
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Detailed breakdown of our data practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-blue-600 mb-4">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Policy Text */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  We use cookies and similar technologies to enhance your experience on our platform. Cookies help us:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze platform usage to improve our services</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences. However, disabling certain cookies may
                  affect platform functionality.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Retention</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  We retain your personal information only as long as necessary for the purposes outlined in this policy:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Active accounts:</strong> Data retained while your account is active</li>
                  <li><strong>Educational records:</strong> Maintained for career guidance and application purposes</li>
                  <li><strong>Analytics data:</strong> Aggregated and anonymized for service improvement</li>
                  <li><strong>Legal requirements:</strong> Retained as required by applicable laws</li>
                </ul>
                <p>
                  You can request deletion of your data at any time, subject to legal and legitimate business requirements.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">International Data Transfers</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Your data may be transferred to and processed in countries other than India. We ensure that such transfers
                  comply with applicable data protection laws and implement appropriate safeguards including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Standard contractual clauses approved by relevant authorities</li>
                  <li>Adequacy decisions by competent data protection authorities</li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Your explicit consent where required</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Edu2Career J&K is designed for students, including those under 18. We are committed to protecting the privacy
                  of minors and comply with all applicable laws regarding children's online privacy protection.
                </p>
                <p className="mb-4">
                  For users under 18, we require parental or guardian consent for data collection and processing. Parents and
                  guardians have the right to review, modify, or request deletion of their child's personal information.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has provided us with personal information without your
                  consent, please contact us immediately.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
                  When we make material changes, we will:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Notify you via email or platform notification</li>
                  <li>Update the "Last updated" date at the top of this policy</li>
                  <li>Provide a summary of key changes</li>
                  <li>Give you time to review and provide feedback</li>
                </ul>
                <p>
                  Your continued use of Edu2Career J&K after policy changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Questions About Your Privacy?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Our privacy team is here to help you understand and exercise your rights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Privacy Team
              </Link>
              <a
                href="mailto:privacy@edu2careerjk.com"
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                privacy@edu2careerjk.com
              </a>
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
