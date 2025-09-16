import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, forgotPassword, signInWithGoogle, signInWithFacebook, resendVerificationEmail } = useAuth();

  // Add user metadata state for Firebase
  const [userMetadata, setUserMetadata] = useState({
    name: '',
    phone: '',
    district: '',
    currentClass: '',
    stream: '',
    schoolCollege: ''
  });
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    district: '',
    currentClass: '',
    stream: '',
    schoolCollege: ''
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const districts = [
    'Srinagar', 'Jammu', 'Baramulla', 'Budgam', 'Anantnag', 'Kupwara', 'Kulgam', 'Shopian',
    'Pulwama', 'Ganderbal', 'Bandipora', 'Kathua', 'Udhampur', 'Doda', 'Ramban', 'Kishtwar',
    'Poonch', 'Rajouri', 'Reasi', 'Samba'
  ];

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage('');
    setTimeout(() => setErrorMessage(''), 5000);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage('');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await signIn(loginForm.email, loginForm.password);
      showSuccess('Login successful! Welcome back.');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMsg = 'Login failed. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMsg = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMsg = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMsg = 'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Please try again later.';
      }

      showError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log('Starting signup for:', registerForm.email);
      await signUp(registerForm.email, registerForm.password, {
        name: registerForm.name,
        phone: registerForm.phone,
        district: registerForm.district,
        currentClass: registerForm.currentClass,
        stream: registerForm.stream,
        schoolCollege: registerForm.schoolCollege
      });
      console.log('Signup successful for:', registerForm.email);

      // Store user data in MongoDB
      try {
        const response = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: registerForm.name,
            email: registerForm.email,
            phone: registerForm.phone,
            district: registerForm.district,
            currentClass: registerForm.currentClass,
            stream: registerForm.stream,
            schoolCollege: registerForm.schoolCollege,
            createdAt: new Date()
          })
        });
        if (!response.ok) {
          throw new Error('Failed to store user data in DB');
        }
        console.log('User data stored in DB');
      } catch (dbError) {
        console.error('DB store error:', dbError);
      }

      // Send welcome SMS
      try {
        const smsResponse = await fetch('http://localhost:3001/api/send-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: registerForm.phone,
            message: `Welcome ${registerForm.name}! Your Edu2Career account has been created. Please verify your email to get started.`
          })
        });
        if (!smsResponse.ok) {
          throw new Error('Failed to send welcome SMS');
        }
        console.log('Welcome SMS sent');
      } catch (smsError) {
        console.error('SMS send error:', smsError);
      }

      setVerificationEmail(registerForm.email);
      setEmailVerificationSent(true);
      showSuccess('Account created successfully! Please check your email to verify your account before signing in.');
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMsg = 'Registration failed. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'An account with this email already exists.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Password should be at least 6 characters long.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMsg = 'Email/password accounts are not enabled. Please contact support.';
      }

      showError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginForm.email) {
      showError('Please enter your email address first.');
      return;
    }
    try {
      await forgotPassword(loginForm.email);
      showSuccess('Password reset email sent. Check your inbox and spam folder.');
    } catch (error: any) {
      console.error('Forgot password error:', error);
      let errorMsg = 'Failed to send reset email. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMsg = 'No account found with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
      }

      showError(errorMsg);
    }
  };

  const handleResendVerification = async () => {
    if (!verificationEmail) return;

    try {
      await resendVerificationEmail();
      showSuccess('Verification email sent again. Please check your inbox.');
    } catch (error) {
      showError('Failed to resend verification email. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await signInWithGoogle();
      showSuccess('Signed in with Google successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      let errorMsg = 'Google sign-in failed. Please try again.';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMsg = 'Popup blocked. Please allow popups for this site.';
      }

      showError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await signInWithFacebook();
      showSuccess('Signed in with Facebook successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error: any) {
      console.error('Facebook sign-in error:', error);
      let errorMsg = 'Facebook sign-in failed. Please try again.';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMsg = 'Popup blocked. Please allow popups for this site.';
      }

      showError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edu2Career J&K</h1>
              <p className="text-sm text-gray-600">Career & Education Navigator</p>
            </div>
          </div>
          <h2 className="text-xl text-gray-700">Welcome to Your Future</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Get Started</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          className="pl-10 pr-10"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Your full name"
                          className="pl-10"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      value={registerForm.password}
                      onChange={(e) => {
                        setRegisterForm({...registerForm, password: e.target.value});
                        calculatePasswordStrength(e.target.value);
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                    <div className={`h-2 ${getPasswordStrengthColor()} transition-all duration-300`} style={{ width: `${(passwordStrength / 5) * 100}%` }} />
                  </div>
                  <p className="text-sm mt-1 text-gray-600">{getPasswordStrengthText()}</p>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="accept-terms" className="text-sm text-gray-700">
                    I agree to the <a href="/terms" className="text-blue-600 underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                  </label>
                </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder="Your phone number"
                          className="pl-10"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-district">District</Label>
                      <Select value={registerForm.district} onValueChange={(value: string) => setRegisterForm({...registerForm, district: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-class">Current Class</Label>
                        <Select value={registerForm.currentClass} onValueChange={(value: string) => setRegisterForm({...registerForm, currentClass: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10th">10th</SelectItem>
                            <SelectItem value="11th">11th</SelectItem>
                            <SelectItem value="12th">12th</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                            <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-stream">Stream</Label>
                        <Select value={registerForm.stream} onValueChange={(value: string) => setRegisterForm({...registerForm, stream: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Stream" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Commerce">Commerce</SelectItem>
                            <SelectItem value="Arts">Arts</SelectItem>
                            <SelectItem value="Vocational">Vocational</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-school">School/College</Label>
                      <Input
                        id="register-school"
                        type="text"
                        placeholder="Your school or college name"
                        value={registerForm.schoolCollege}
                        onChange={(e) => setRegisterForm({...registerForm, schoolCollege: e.target.value})}
                        required
                      />
                    </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>

          {/* Social Login Buttons */}
          <div className="flex flex-col space-y-4 mt-6 px-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition-colors"
            >
              <img src="/google-logo.svg" alt="Google logo" className="w-6 h-6" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={handleFacebookSignIn}
              disabled={isLoading}
              className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition-colors"
            >
              <img src="/facebook-logo.svg" alt="Facebook logo" className="w-6 h-6" />
              <span>Continue with Facebook</span>
            </button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  </motion.div>

        {/* Email Verification Message */}
        {emailVerificationSent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Verify Your Email</h3>
                <p className="text-blue-700">
                  We've sent a verification email to <strong>{verificationEmail}</strong>.
                  Please check your inbox and click the verification link to activate your account.
                </p>
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={handleResendVerification}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Resend verification email
                  </button>
                  <button
                    onClick={() => setEmailVerificationSent(false)}
                    className="text-gray-600 hover:text-gray-800 underline"
                  >
                    Back to login
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm">!</span>
              </div>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-green-700">{successMessage}</p>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-600 mt-6"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  );
}