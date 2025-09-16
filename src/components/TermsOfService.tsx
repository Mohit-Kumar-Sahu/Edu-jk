import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, Scale, Users, Shield, AlertTriangle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export function TermsOfService() {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Eligibility",
      content: [
        "Open to students from Jammu & Kashmir and other regions",
        "Minimum age requirement of 13 years",
        "Parental consent required for users under 18",
        "Accurate information required during registration"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Service Usage",
      content: [
        "Platform provided for educational and career guidance purposes",
        "Career assessments and recommendations are suggestions, not guarantees",
        "Users responsible for verifying information independently",
        "Fair usage policy to ensure service availability for all users"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "User Responsibilities",
      content: [
        "Provide accurate and truthful information",
        "Maintain account security and confidentiality",
        "Use services ethically and legally",
        "Respect intellectual property rights"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Content & Intellectual Property",
      content: [
        "Platform content protected by copyright and trademark laws",
        "User-generated content subject to usage terms",
        "Limited license granted for personal, non-commercial use",
        "Prohibition on unauthorized reproduction or distribution"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Prohibited Activities",
      content: [
        "No harassment, abuse, or discriminatory behavior",
        "No unauthorized access or security violations",
        "No spam, fraudulent, or misleading activities",
        "No violation of applicable laws or regulations"
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
              Terms of <span className="text-blue-600">Service</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Please read these terms carefully before using Edu2Career J&K. By using our platform,
              you agree to be bound by these terms and conditions.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: January 2024 | Effective: January 1, 2024
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Agreement Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Edu2Career J&K
                regarding your use of our career guidance platform. By accessing or using our services, you acknowledge
                that you have read, understood, and agree to be bound by these Terms.
              </p>
              <p className="mb-4">
                Our mission is to provide quality career guidance to students in Jammu & Kashmir. These terms ensure
                fair and responsible use of our platform while protecting the rights of all users and maintaining
                service quality.
              </p>
              <p>
                If you do not agree to these Terms, please do not use Edu2Career J&K. We reserve the right to modify
                these terms at any time, with reasonable notice provided to users.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Sections */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Terms & Conditions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Important aspects of using Edu2Career J&K
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

      {/* Detailed Terms */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Registration & Security</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  When you create an account with Edu2Career J&K, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in
                  fraudulent or illegal activities.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Availability & Limitations</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Edu2Career J&K provides career guidance services on an "as is" and "as available" basis. While we strive
                  for accuracy and reliability, please note:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Career assessments and recommendations are tools, not definitive predictions</li>
                  <li>College and scholarship information is regularly updated but may change</li>
                  <li>Service availability may be affected by maintenance, updates, or unforeseen circumstances</li>
                  <li>We do not guarantee specific outcomes from using our platform</li>
                </ul>
                <p>
                  Users should independently verify all information and make decisions based on their own research
                  and professional advice.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Data Protection</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference. Key commitments include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Transparent data collection and usage practices</li>
                  <li>Secure storage and protection of personal information</li>
                  <li>Limited sharing with third parties only as necessary</li>
                  <li>User rights to access, correct, and delete their data</li>
                  <li>Compliance with applicable data protection laws</li>
                </ul>
                <p>
                  By using Edu2Career J&K, you consent to our data practices as described in the Privacy Policy.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Disclaimers & Limitation of Liability</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Edu2Career J&K and its affiliates, officers, directors, employees, and agents shall not be liable for:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Any indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Service interruptions or data loss</li>
                  <li>Third-party actions or content</li>
                  <li>Career or educational outcomes</li>
                </ul>
                <p>
                  Our total liability shall not exceed the amount paid by you for services in the 12 months preceding
                  the claim. Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Termination & Modification</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Either party may terminate this agreement at any time. We may terminate or suspend your account
                  immediately for violations of these Terms. Upon termination:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Your right to use the service ceases immediately</li>
                  <li>We may delete your account and data (subject to legal requirements)</li>
                  <li>Sections regarding liability and governing law survive termination</li>
                  <li>You remain responsible for all charges incurred before termination</li>
                </ul>
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be effective 30 days after
                  posting, unless immediate changes are required for legal or security reasons.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Governing Law & Dispute Resolution</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  These Terms are governed by the laws of India, with specific reference to Jammu & Kashmir jurisdiction
                  where applicable. Any disputes shall be resolved through:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Good faith negotiations between the parties</li>
                  <li>Mediation through a neutral third party</li>
                  <li>Binding arbitration in Jammu & Kashmir if necessary</li>
                  <li>Courts of competent jurisdiction as final resort</li>
                </ul>
                <p>
                  We encourage users to contact us first to resolve any concerns before pursuing formal dispute resolution.
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
              Questions About These Terms?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Our legal team is here to help clarify any aspects of our terms of service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Legal Team
              </Link>
              <a
                href="mailto:legal@edu2careerjk.com"
                className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                legal@edu2careerjk.com
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
