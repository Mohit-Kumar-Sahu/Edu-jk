import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Phone, MapPin, Check, ChevronsUpDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLocalization } from '../hooks/useLocalization';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { cn } from '../lib/utils'; // shadcn utility

// Data extracted from the provided PDF for the combobox
const institutions = [
  { value: 'U-0688', label: 'All India Institute of Medical Sciences Bhubaneswar' },
  { value: 'U-0096', label: 'All India Institute of Medical Sciences Delhi' },
  { value: 'U-0689', label: 'All India Institute of Medical Sciences Jodhpur' },
  { value: 'U-1017', label: 'Indian Institute of Management Raipur' },
  { value: 'U-0690', label: 'All India Institute of Medical Sciences Raipur' },
  { value: 'U-0497', label: 'Amity University' },
  { value: 'U-0456', label: 'Indian Institute of Technology Madras' },
  // ... Add all other institutions from the PDF here in the same format
  // For brevity, only a few are listed. You should populate this fully.
];

// List of states and UTs for the pan-India context
const statesOfIndia = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry'
];


// Institution Combobox Component
const InstitutionCombobox = ({ value, onSelect }: { value: string; onSelect: (value: string) => void; }) => {
    const { t } = useLocalization();
    const [open, setOpen] = useState(false);
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {value
              ? institutions.find((inst) => inst.value === value)?.label
              : t('authPage.select_institution')}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0">
          <Command>
            <CommandInput placeholder={t('authPage.select_institution')} />
            <CommandEmpty>No institution found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {institutions.map((inst) => (
                <CommandItem
                  key={inst.value}
                  value={inst.label}
                  onSelect={() => {
                    onSelect(inst.value === value ? "" : inst.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === inst.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {inst.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };
  

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
    state: '',
    currentClass: '',
    stream: '',
    schoolCollege: '' // This will now store the AISHE code
  });

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
      await signUp(registerForm.email, registerForm.password, {
        name: registerForm.name,
        phone: registerForm.phone,
        state: registerForm.state,
        currentClass: registerForm.currentClass,
        stream: registerForm.stream,
        schoolCollege: registerForm.schoolCollege
      });

      // Store user data in MongoDB
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...registerForm, createdAt: new Date() })
      });
      if (!response.ok) throw new Error('Failed to store user data in DB');
      
      // Send welcome SMS
      const smsResponse = await fetch(`${API_BASE}/send-sms`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: registerForm.phone,
            message: t('authPage.alerts.welcome_sms', { name: registerForm.name })
          })
      });
      if (!smsResponse.ok) console.error('Failed to send welcome SMS');

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
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
              <h1 className="text-2xl font-bold text-gray-900">Viksit Shiksha</h1>
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
                <TabsContent value="login" className="space-y-4 pt-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email and Password fields remain the same */}
                    <div className="space-y-2">
                      <Label htmlFor="login-email">{t('authPage.email')}</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="login-email" type="email" placeholder={t('authPage.email')} className="pl-10" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">{t('authPage.password')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="login-password" type={showPassword ? "text" : "password"} placeholder={t('authPage.password')} className="pl-10 pr-10" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-800">{t('authPage.forgotPassword')}</button>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? t('authPage.buttons.loading_signin') : t('authPage.signIn')}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register" className="space-y-4 pt-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name, Email, Password, Phone fields remain similar */}
                    <div className="space-y-2">
                        <Label htmlFor="register-name">{t('authPage.name')}</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="register-name" type="text" placeholder={t('authPage.name')} className="pl-10" value={registerForm.name} onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="register-email">{t('authPage.email')}</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="register-email" type="email" placeholder={t('authPage.email')} className="pl-10" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t('authPage.password')}</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input id="register-password" type={showPassword ? "text" : "password"} placeholder={t('authPage.password')} className="pl-10 pr-10" value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})} required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="register-phone">{t('authPage.phone')}</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input id="register-phone" type="tel" placeholder={t('authPage.phone')} className="pl-10" value={registerForm.phone} onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})} required />
                        </div>
                    </div>

                    {/* NEW State Dropdown */}
                    <div className="space-y-2">
                        <Label>{t('authPage.state')}</Label>
                        <Select value={registerForm.state} onValueChange={(value: string) => setRegisterForm({...registerForm, state: value})}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('authPage.select_state')} />
                            </SelectTrigger>
                            <SelectContent>
                                {statesOfIndia.map((state) => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* NEW Institution Combobox */}
                    <div className="space-y-2">
                      <Label>{t('authPage.schoolCollege')}</Label>
                      <InstitutionCombobox 
                        value={registerForm.schoolCollege}
                        onSelect={(value) => setRegisterForm({ ...registerForm, schoolCollege: value })}
                      />
                    </div>

                    {/* Class and Stream Dropdowns */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('authPage.currentClass')}</Label>
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
                        <Label>{t('authPage.stream')}</Label>
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
