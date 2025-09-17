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

  const API_BASE = import.meta.env.VITE_API_BASE;

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
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

  // Your districts array definition might have a similar key mismatch.
  // Make sure your localization file has a structure like:
  // "authPage": { "data": { "districts": { "srinagar": "Srinagar", ... } } }
  const districts = [
    t('authPage.data.districts.srinagar'), t('authPage.data.districts.jammu'), t('authPage.data.districts.baramulla'), t('authPage.data.districts.budgam'),
    t('authPage.data.districts.anantnag'), t('authPage.data.districts.kupwara'), t('authPage.data.districts.kulgam'), t('authPage.data.districts.shopian'),
    t('authPage.data.districts.pulwama'), t('authPage.data.districts.ganderbal'), t('authPage.data.districts.bandipora'), t('authPage.data.districts.kathua'),
    t('authPage.data.districts.udhampur'), t('authPage.data.districts.doda'), t('authPage.data.districts.ramban'), t('authPage.data.districts.kishtwar'),
    t('authPage.data.districts.poonch'), t('authPage.data.districts.rajouri'), t('authPage.data.districts.reasi'), t('authPage.data.districts.samba')
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(loginForm.email, loginForm.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      alert(t('authPage.alerts.login_failed'));
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
            message: t('authPage.alerts.welcome_sms', { name: registerForm.name })
          })
        });
        if (!smsResponse.ok) {
          throw new Error('Failed to send welcome SMS');
        }
        console.log('Welcome SMS sent');
      } catch (smsError) {
        console.error('SMS send error:', smsError);
      }

      alert(t('authPage.alerts.registration_success'));
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(t('authPage.alerts.registration_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginForm.email) {
      alert(t('authPage.alerts.forgot_password_no_email'));
      return;
    }
    try {
      await forgotPassword(loginForm.email);
      alert(t('authPage.alerts.forgot_password_success'));
    } catch (error) {
      console.error('Forgot password error:', error);
      alert(t('authPage.alerts.forgot_password_failed'));
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
              <p className="text-sm text-gray-600">{t('authPage.header_tagline')}</p>
            </div>
          </div>
          <h2 className="text-xl text-gray-700">{t('authPage.welcome_message')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">{t('authPage.signInTitle')}</CardTitle>
              <CardDescription className="text-center">
                {t('authPage.signInSubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t('authPage.signIn')}</TabsTrigger>
                  <TabsTrigger value="register">{t('authPage.signUp')}</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t('authPage.email')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder={t('authPage.email')}
                          className="pl-10"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t('authPage.password')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('authPage.password')}
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
                        {t('authPage.forgotPassword')}
                      </button>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t('authPage.buttons.loading_signin') : t('authPage.signIn')}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">{t('authPage.name')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder={t('authPage.name')}
                          className="pl-10"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t('authPage.email')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder={t('authPage.email')}
                          className="pl-10"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t('authPage.password')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t('authPage.password')}
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
                      <Label htmlFor="register-phone">{t('authPage.phone')}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-phone"
                          type="tel"
                          placeholder={t('authPage.phone')}
                          className="pl-10"
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-district">{t('authPage.district')}</Label>
                      <Select value={registerForm.district} onValueChange={(value: string) => setRegisterForm({...registerForm, district: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('authPage.district')} />
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
                        <Label htmlFor="register-class">{t('authPage.currentClass')}</Label>
                        <Select value={registerForm.currentClass} onValueChange={(value: string) => setRegisterForm({...registerForm, currentClass: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('authPage.currentClass')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10th">{t('authPage.data.class.10th')}</SelectItem>
                            <SelectItem value="11th">{t('authPage.data.class.11th')}</SelectItem>
                            <SelectItem value="12th">{t('authPage.data.class.12th')}</SelectItem>
                            <SelectItem value="Graduate">{t('authPage.data.class.graduate')}</SelectItem>
                            <SelectItem value="Post Graduate">{t('authPage.data.class.post_graduate')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-stream">{t('authPage.stream')}</Label>
                        <Select value={registerForm.stream} onValueChange={(value: string) => setRegisterForm({...registerForm, stream: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('authPage.stream')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Science">{t('authPage.data.stream.science')}</SelectItem>
                            <SelectItem value="Commerce">{t('authPage.data.stream.commerce')}</SelectItem>
                            <SelectItem value="Arts">{t('authPage.data.stream.arts')}</SelectItem>
                            <SelectItem value="Vocational">{t('authPage.data.stream.vocational')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-school">{t('authPage.schoolCollege')}</Label>
                      <Input
                        id="register-school"
                        type="text"
                        placeholder={t('authPage.schoolCollege')}
                        value={registerForm.schoolCollege}
                        onChange={(e) => setRegisterForm({...registerForm, schoolCollege: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t('authPage.buttons.loading_create_account') : t('authPage.signUp')}
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
          {t('authPage.terms_and_privacy')}
        </motion.p>
      </div>
    </div>
  );
}