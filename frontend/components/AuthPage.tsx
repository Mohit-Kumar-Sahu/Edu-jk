import React, {
  useState
} from 'react';
import {
  motion
} from 'framer-motion';
import {
  useNavigate
} from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Briefcase,
  Building,
  ArrowLeft
} from 'lucide-react';
import {
  useAuth
} from '../hooks/useAuth';
import {
  Button
} from './ui/button';
import {
  Input
} from './ui/input';
import {
  Label
} from './ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';

type UserRole = 'student' | 'teacher' | 'institution';

export function AuthPage() {
  const navigate = useNavigate();
  const {
    signIn
  } = useAuth();
  const [selectedRole, setSelectedRole] = useState < UserRole | null > (null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // MODIFIED: This function now passes the selected role to the signIn hook
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      // We pass the role here! This is the key change.
      await signIn(loginForm.email, loginForm.password, selectedRole);
      navigate('/dashboard'); // This will now work correctly!
    } catch (error) {
      console.error(error);
      // This alert won't show anymore with our dummy login, but it's good to keep
      alert('Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return ( <
    div className = "min-h-screen flex items-center justify-center p-4 bg-gray-50" >
    <
    div className = "w-full max-w-md" >
    <
    motion.div initial = {
      {
        opacity: 0,
        y: -20
      }
    }
    animate = {
      {
        opacity: 1,
        y: 0
      }
    }
    className = "text-center mb-8" >
    <
    div className = "flex items-center justify-center space-x-2" >
    <
    div className = "w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center" >
    <
    GraduationCap className = "w-7 h-7 text-white" / >
    <
    /div> <
    h1 className = "text-2xl font-bold text-gray-900" > Viksit Shiksha < /h1> <
    /div> <
    /motion.div> {
      !selectedRole ? ( <
        motion.div initial = {
          {
            opacity: 0,
            scale: 0.95
          }
        }
        animate = {
          {
            opacity: 1,
            scale: 1
          }
        } >
        <
        Card >
        <
        CardHeader > < CardTitle className = "text-2xl text-center" > Select Your Role < /CardTitle><CardDescription className="text-center">Choose how you want to access the platform.</CardDescription > < /CardHeader> <
        CardContent className = "space-y-4" >
        <
        RoleCard icon = {
          < User size = {
            24
          }
          />} title="Student" description="Log in to explore your career path." onClick={() => setSelectedRole('student')} / >
        <
        RoleCard icon = {
          < Briefcase size = {
            24
          }
          />} title="Teacher / Faculty" description="Log in to manage courses and students." onClick={() => setSelectedRole('teacher')} / >
        <
        RoleCard icon = {
          < Building size = {
            24
          }
          />} title="Institution" description="Log in to view analytics and compliance." onClick={() => setSelectedRole('institution')} / >
        <
        /CardContent> <
        /Card> <
        /motion.div>
      ) : ( <
        motion.div initial = {
          {
            opacity: 0,
            scale: 0.95
          }
        }
        animate = {
          {
            opacity: 1,
            scale: 1
          }
        } >
        <
        Card >
        <
        CardHeader >
        <
        div className = "relative text-center" >
        <
        Button variant = "ghost"
        size = "icon"
        className = "absolute left-0 top-1"
        onClick = {
          () => setSelectedRole(null)
        } > < ArrowLeft className = "w-5 h-5" / > < /Button> <
        CardTitle className = "text-2xl capitalize" > {
          selectedRole
        }
        Login < /CardTitle> <
        CardDescription > Enter any details to continue. < /CardDescription> <
        /div> <
        /CardHeader> <
        CardContent >
        <
        form onSubmit = {
          handleLogin
        }
        className = "space-y-4 pt-4" >
        <
        div className = "space-y-2" >
        <
        Label htmlFor = "login-email" > Email < /Label> <
        div className = "relative" > < Mail className = "absolute left-3 top-3 h-4 w-4 text-gray-400" / > < Input id = "login-email"
        type = "email"
        value = {
          loginForm.email
        }
        onChange = {
          (e) => setLoginForm({ ...loginForm,
            email: e.target.value
          })
        }
        required placeholder = "Enter any email..."
        className = "pl-10" / > < /div> <
        /div> <
        div className = "space-y-2" >
        <
        Label htmlFor = "login-password" > Password < /Label> <
        div className = "relative" > < Lock className = "absolute left-3 top-3 h-4 w-4 text-gray-400" / > < Input id = "login-password"
        type = "password"
        placeholder = "Enter any password..."
        className = "pl-10" / > < /div> <
        /div> <
        Button type = "submit"
        className = "w-full"
        disabled = {
          isLoading
        } > {
          isLoading ? 'Logging In...' : `Login as ${selectedRole}`
        } < /Button> <
        /form> <
        /CardContent> <
        /Card> <
        /motion.div>
      )
    } <
    /div> <
    /div>
  );
}

const RoleCard = ({
  icon,
  title,
  description,
  onClick
}: {
  icon: React.ReactNode;title: string;description: string;onClick: () => void;
}) => ( <
  div onClick = {
    onClick
  }
  className = "p-4 border rounded-lg flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition-colors" >
  <
  div className = "p-3 bg-gray-100 rounded-full" > {
    icon
  } < /div> <
  div >
  <
  h3 className = "font-semibold" > {
    title
  } < /h3> <
  p className = "text-sm text-gray-500" > {
    description
  } < /p> <
  /div> <
  /div>
);
