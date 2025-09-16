import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, Star, MessageSquare, ThumbsUp, AlertCircle, CheckCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export function Feedback() {
  const [feedbackType, setFeedbackType] = useState<'general' | 'bug' | 'feature' | 'support'>('general');
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Feedback submitted:', { ...formData, rating, feedbackType });
    setSubmitted(true);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
    setRating(0);
    setFeedbackType('general');
  };

  const feedbackTypes = [
    {
      id: 'general',
      title: 'General Feedback',
      description: 'Share your overall experience',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: 'bug',
      title: 'Bug Report',
      description: 'Report technical issues or bugs',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 'feature',
      title: 'Feature Request',
      description: 'Suggest new features or improvements',
      icon: <ThumbsUp className="w-5 h-5" />
    },
    {
      id: 'support',
      title: 'Support Request',
      description: 'Get help with using the platform',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      name: "Ayesha K.",
      location: "Srinagar",
      rating: 5,
      feedback: "Edu2Career helped me discover my passion for computer science. The career quiz was incredibly accurate and the college recommendations were spot-on!",
      date: "2 weeks ago"
    },
    {
      name: "Rahul M.",
      location: "Jammu",
      rating: 5,
      feedback: "The scholarship checker saved me so much time and money. I found scholarships I didn't even know existed. Highly recommend!",
      date: "1 month ago"
    },
    {
      name: "Mehreen B.",
      location: "Baramulla",
      rating: 5,
      feedback: "As a student from a small town, I was worried about college admissions. This platform made the entire process so much easier and more transparent.",
      date: "3 weeks ago"
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
              Share Your <span className="text-blue-600">Feedback</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Your feedback helps us improve Edu2Career J&K and better serve students across Jammu & Kashmir.
              We value every opinion and suggestion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Feedback Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Tell Us What You Think</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Thank You!</h3>
                  <p className="text-green-700">
                    Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Another Feedback
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Feedback Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What type of feedback do you have?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFeedbackType(type.id as any)}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            feedbackType === type.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={feedbackType === type.id ? 'text-blue-600' : 'text-gray-400'}>
                              {type.icon}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{type.title}</div>
                              <div className="text-xs text-gray-500">{type.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How would you rate your experience? (Optional)
                    </label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your feedback"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Please share your detailed feedback, suggestions, or concerns..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Testimonials Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What Others Are Saying</h2>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.location}</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 italic mb-3">"{testimonial.feedback}"</p>
                    <div className="text-xs text-gray-500">{testimonial.date}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Join Our Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Help us build the best career guidance platform for J&K students by sharing your experience.
                </p>
                <div className="text-sm text-gray-500">
                  Your feedback directly influences our development priorities and helps us serve students better.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Feedback Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how student feedback has shaped Edu2Career J&K
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Feedback Submissions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Positive Reviews</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Features Added</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24hrs</div>
              <div className="text-gray-600">Average Response Time</div>
            </motion.div>
          </div>
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
