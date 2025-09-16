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
  const { signIn, signUp, forgotPassword } = useAuth();

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

  const districts = [
    'Srinagar', 'Jammu', 'Baramulla', 'Budgam', 'Anantnag', 'Kupwara', 'Kulgam', 'Shopian',
    'Pulwama', 'Ganderbal', 'Bandipora', 'Kathua', 'Udhampur', 'Doda', 'Ramban', 'Kishtwar',
    'Poonch', 'Rajouri', 'Reasi', 'Samba'
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(loginForm.email, loginForm.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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

      // Note: After signup, user needs to verify email before login
      alert('Please check your email to verify your account before signing in. A welcome SMS has been sent.');
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginForm.email) {
      alert('Please enter your email address first.');
      return;
    }
    try {
      await forgotPassword(loginForm.email);
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('Failed to send reset email. Please try again.');
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
                          onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
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
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

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