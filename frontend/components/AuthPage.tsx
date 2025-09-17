import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLocalization } from '../hooks/useLocalization';

export function AuthPage() {
  const { t } = useLocalization();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, forgotPassword } = useAuth();
  const navigate = useNavigate();

  // Define API base URL using environment variable
  const API_BASE = import.meta.env.VITE_API_BASE;

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

  // The districts array is now defined here, ensuring it re-renders
  // with the new language.
  const districts = [
    t('district_srinagar'), t('district_jammu'), t('district_baramulla'), t('district_budgam'),
    t('district_anantnag'), t('district_kupwara'), t('district_kulgam'), t('district_shopian'),
    t('district_pulwama'), t('district_ganderbal'), t('district_bandipora'), t('district_kathua'),
    t('district_udhampur'), t('district_doda'), t('district_ramban'), t('district_kishtwar'),
    t('district_poonch'), t('district_rajouri'), t('district_reasi'), t('district_samba')
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(loginForm.email, loginForm.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      alert(t('login_failed_alert'));
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
        const response = await fetch(`${API_BASE}/users`, {
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
        const smsResponse = await fetch(`${API_BASE}/send-sms`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: registerForm.phone,
            // Use the t() function with a variable
            message: t('welcome_sms', { name: registerForm.name })
          })
        });
        if (!smsResponse.ok) {
          throw new Error('Failed to send welcome SMS');
        }
        console.log('Welcome SMS sent');
      } catch (smsError) {
        console.error('SMS send error:', smsError);
      }

      alert(t('registration_success_alert'));
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(t('registration_failed_alert'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginForm.email) {
      alert(t('forgot_password_no_email_alert'));
      return;
    }
    try {
      await forgotPassword(loginForm.email);
      alert(t('forgot_password_success_alert'));
    } catch (error) {
      console.error('Forgot password error:', error);
      alert(t('forgot_password_failed_alert'));
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
              <p className="text-sm text-gray-600">{t('header_tagline')}</p>
            </div>
          </div>
          <h2 className="text-xl text-gray-700">{t('welcome_message')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">{t('card_title')}</CardTitle>
              <CardDescription className="text-center">
                {t('card_description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t('tab_sign_in')}</TabsTrigger>
                  <TabsTrigger value="register">{t('tab_sign_up')}</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t('email_label')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder={t('email_placeholder')}
                          className="pl-10"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t('password_label')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('password_placeholder')}
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
                        {t('forgot_password_link')}
                      </button>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t('loading_signin') : t('sign_in_button')}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">{t('full_name_label')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder={t('full_name_placeholder')}
                          className="pl-10"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t('email_label')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder={t('email_placeholder')}
                          className="pl-10"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t('password_label')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('create_password_placeholder')}
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
                      <Label htmlFor="register-phone">{t('phone_label')}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder={t('phone_placeholder')}
                          className="pl-10"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-district">{t('district_label')}</Label>
                      <Select value={registerForm.district} onValueChange={(value: string) => setRegisterForm({...registerForm, district: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('district_placeholder')} />
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
                        <Label htmlFor="register-class">{t('class_label')}</Label>
                        <Select value={registerForm.currentClass} onValueChange={(value: string) => setRegisterForm({...registerForm, currentClass: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('class_placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10th">{t('class_10th')}</SelectItem>
                            <SelectItem value="11th">{t('class_11th')}</SelectItem>
                            <SelectItem value="12th">{t('class_12th')}</SelectItem>
                            <SelectItem value="Graduate">{t('class_graduate')}</SelectItem>
                            <SelectItem value="Post Graduate">{t('class_post_graduate')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-stream">{t('stream_label')}</Label>
                        <Select value={registerForm.stream} onValueChange={(value: string) => setRegisterForm({...registerForm, stream: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('stream_placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Science">{t('stream_science')}</SelectItem>
                            <SelectItem value="Commerce">{t('stream_commerce')}</SelectItem>
                            <SelectItem value="Arts">{t('stream_arts')}</SelectItem>
                            <SelectItem value="Vocational">{t('stream_vocational')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-school">{t('school_college_label')}</Label>
                      <Input
                        id="register-school"
                        type="text"
                        placeholder={t('school_college_placeholder')}
                        value={registerForm.schoolCollege}
                        onChange={(e) => setRegisterForm({...registerForm, schoolCollege: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t('loading_create_account') : t('create_account_button')}
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
          {t('terms_and_privacy')}
        </motion.p>
      </div>
    </div>
  );
}