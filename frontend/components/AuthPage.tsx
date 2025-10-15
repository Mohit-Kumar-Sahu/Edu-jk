import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Eye, EyeOff, GraduationCap, Mail, Lock, User, Phone, Briefcase, Building, ArrowLeft,
    Check, ChevronsUpDown, FileBadge, Hash 
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { useLocalization } from '../hooks/useLocalization';

// --- DATA (Keep this at the top) ---
type UserRole = 'student' | 'teacher' | 'institution';

// This should be populated from your database or a larger static file in a real app
const institutions = [
  { value: 'U-0688', label: 'All India Institute of Medical Sciences Bhubaneswar' },
  { value: 'U-0096', label: 'All India Institute of Medical Sciences Delhi' },
  { value: 'U-1017', label: 'Indian Institute of Management Raipur' },
  { value: 'U-0456', label: 'Indian Institute of Technology Madras' },
  // Populate with all institutions from the PDF
];

const statesOfIndia = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
  'Lakshadweep', 'Puducherry'
];

// --- REUSABLE COMPONENTS (for clean code) ---

const InstitutionCombobox = ({ value, onSelect }: { value: string; onSelect: (value: string) => void; }) => {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
            {value ? institutions.find((inst) => inst.value === value)?.label : "Select institution..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0">
          <Command>
            <CommandInput placeholder="Search institution..." />
            <CommandEmpty>No institution found.</CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {institutions.map((inst) => (
                <CommandItem key={inst.value} value={inst.label} onSelect={() => { onSelect(inst.value); setOpen(false); }}>
                  <Check className={`mr-2 h-4 w-4 ${value === inst.value ? "opacity-100" : "opacity-0"}`} />
                  {inst.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
};

// --- AUTH FORMS FOR EACH ROLE ---

const StudentRegisterForm = ({ onRegister, isLoading }: { onRegister: (data: any) => void; isLoading: boolean; }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', state: '', currentClass: '', stream: '', schoolCollege: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2"><Label htmlFor="s-name">Full Name</Label><Input id="s-name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Your Name" /></div>
            <div className="space-y-2"><Label htmlFor="s-email">Email</Label><Input id="s-email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="you@example.com" /></div>
            <div className="space-y-2"><Label htmlFor="s-phone">Phone</Label><Input id="s-phone" type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required placeholder="9876543210" /></div>
            <div className="space-y-2 relative"><Label htmlFor="s-password">Password</Label><Input id="s-password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required /><Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</Button></div>
            <div className="space-y-2"><Label>State</Label><Select onValueChange={(v) => setForm({...form, state: v})}><SelectTrigger><SelectValue placeholder="Select your state" /></SelectTrigger><SelectContent>{statesOfIndia.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2"><Label>Institution</Label><InstitutionCombobox value={form.schoolCollege} onSelect={(v) => setForm({...form, schoolCollege: v})} /></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Class</Label><Select onValueChange={(v) => setForm({...form, currentClass: v})}><SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger><SelectContent><SelectItem value="10th">10th</SelectItem><SelectItem value="12th">12th</SelectItem><SelectItem value="Graduate">Graduate</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label>Stream</Label><Select onValueChange={(v) => setForm({...form, stream: v})}><SelectTrigger><SelectValue placeholder="Select Stream" /></SelectTrigger><SelectContent><SelectItem value="Science">Science</SelectItem><SelectItem value="Commerce">Commerce</SelectItem><SelectItem value="Arts">Arts</SelectItem></SelectContent></Select></div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Student Account'}</Button>
        </form>
    );
};

const TeacherRegisterForm = ({ onRegister, isLoading }: { onRegister: (data: any) => void; isLoading: boolean; }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', aparId: '', schoolCollege: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(form);
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2"><Label htmlFor="t-name">Full Name</Label><Input id="t-name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Your Name" /></div>
            <div className="space-y-2"><Label htmlFor="t-email">Email</Label><Input id="t-email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="you@example.com" /></div>
            <div className="space-y-2"><Label htmlFor="t-phone">Phone</Label><Input id="t-phone" type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required placeholder="9876543210" /></div>
            <div className="space-y-2 relative"><Label htmlFor="t-password">Password</Label><Input id="t-password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required /><Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</Button></div>
            <div className="space-y-2"><Label htmlFor="t-apar">APAR ID (Optional)</Label><Input id="t-apar" value={form.aparId} onChange={(e) => setForm({...form, aparId: e.target.value})} placeholder="Your APAR ID" /></div>
            <div className="space-y-2"><Label>Institution</Label><InstitutionCombobox value={form.schoolCollege} onSelect={(v) => setForm({...form, schoolCollege: v})} /></div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Teacher Account'}</Button>
        </form>
    );
};

const InstitutionRegisterForm = ({ onRegister, isLoading }: { onRegister: (data: any) => void; isLoading: boolean; }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', schoolCollege: '' });
    const [showPassword, setShowPassword] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2"><Label htmlFor="i-name">Administrator Name</Label><Input id="i-name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Registrar's Name" /></div>
            <div className="space-y-2"><Label htmlFor="i-email">Official Email</Label><Input id="i-email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="admin@institution.edu" /></div>
            <div className="space-y-2"><Label htmlFor="i-phone">Official Phone</Label><Input id="i-phone" type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required placeholder="Official Contact Number" /></div>
            <div className="space-y-2 relative"><Label htmlFor="i-password">Password</Label><Input id="i-password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required /><Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</Button></div>
            <div className="space-y-2"><Label>Select Your Institution</Label><InstitutionCombobox value={form.schoolCollege} onSelect={(v) => setForm({...form, schoolCollege: v})} /></div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating Account...' : 'Create Institution Account'}</Button>
        </form>
    );
};

// --- MAIN AUTH PAGE COMPONENT ---

export function AuthPage() {
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleRegistration = async (formData: any) => {
        setIsLoading(true);
        try {
            await signUp(formData.email, formData.password, { displayName: formData.name });
            await fetch(`${import.meta.env.VITE_API_BASE}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role: selectedRole, createdAt: new Date() }),
            });
            alert('Registration successful! Please proceed to login.');
            // Ideally, switch to the login tab here
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. The email might already be in use.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn(loginForm.email, loginForm.password);
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2"><div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center"><GraduationCap className="w-7 h-7 text-white" /></div><h1 className="text-2xl font-bold text-gray-900">Viksit Shiksha</h1></div>
                </motion.div>

                {!selectedRole ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <Card>
                            <CardHeader><CardTitle className="text-2xl text-center">Select Your Role</CardTitle><CardDescription className="text-center">Choose how you want to join our platform.</CardDescription></CardHeader>
                            <CardContent className="space-y-4">
                                <RoleCard icon={<User size={24} />} title="Student" description="Explore career paths, colleges, and scholarships." onClick={() => setSelectedRole('student')} />
                                <RoleCard icon={<Briefcase size={24} />} title="Teacher / Faculty" description="Access resources and manage student performance." onClick={() => setSelectedRole('teacher')} />
                                <RoleCard icon={<Building size={24} />} title="Institution" description="Manage institutional data and view analytics." onClick={() => setSelectedRole('institution')} />
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <Card>
                            <CardHeader>
                                <div className="relative text-center">
                                    <Button variant="ghost" size="icon" className="absolute left-0 top-1" onClick={() => setSelectedRole(null)}><ArrowLeft className="w-5 h-5" /></Button>
                                    <CardTitle className="text-2xl capitalize">{selectedRole} Account</CardTitle>
                                    <CardDescription>Welcome! Sign in or create an account.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="login" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="login">Login</TabsTrigger><TabsTrigger value="register">Register</TabsTrigger></TabsList>
                                    <TabsContent value="login">
                                        <form onSubmit={handleLogin} className="space-y-4 pt-4">
                                            <div className="space-y-2"><Label htmlFor="login-email">Email</Label><Input id="login-email" type="email" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} required placeholder="you@example.com" /></div>
                                            <div className="space-y-2 relative"><Label htmlFor="login-password">Password</Label><Input id="login-password" type={showPassword ? "text" : "password"} value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} required /><Button type="button" variant="ghost" size="icon" className="absolute right-1 bottom-1 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}</Button></div>
                                            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing In...' : 'Sign In'}</Button>
                                        </form>
                                    </TabsContent>
                                    <TabsContent value="register">
                                        {selectedRole === 'student' && <StudentRegisterForm onRegister={handleRegistration} isLoading={isLoading} />}
                                        {selectedRole === 'teacher' && <TeacherRegisterForm onRegister={handleRegistration} isLoading={isLoading} />}
                                        {selectedRole === 'institution' && <InstitutionRegisterForm onRegister={handleRegistration} isLoading={isLoading} />}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

const RoleCard = ({ icon, title, description, onClick }: { icon: React.ReactNode; title: string; description: string; onClick: () => void; }) => (
    <div onClick={onClick} className="p-4 border rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors">
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
        <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    </div>
);
