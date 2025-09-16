import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Download, 
  Eye, 
  Edit2, 
  Plus,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ResumeBuilder() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('preview');
  const [isEditing, setIsEditing] = useState(false);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      address: user?.user_metadata?.address || '',
      district: user?.user_metadata?.district || '',
      objective: 'Seeking opportunities to apply my academic knowledge and skills in a dynamic environment that fosters growth and learning.'
    },
    education: [
      {
        id: '1',
        institution: user?.user_metadata?.schoolCollege || '',
        degree: user?.user_metadata?.currentClass || '',
        stream: user?.user_metadata?.stream || '',
        year: '2024',
        percentage: '85%',
        achievements: 'School topper in Mathematics'
      }
    ],
    skills: [
      'Communication Skills',
      'Computer Literacy',
      'Problem Solving',
      'Time Management',
      'Teamwork'
    ],
    projects: [
      {
        id: '1',
        title: 'Science Fair Project',
        description: 'Developed a working model on renewable energy sources',
        technologies: 'Research, Presentation',
        duration: '3 months'
      }
    ],
    achievements: [
      'First Prize in Inter-School Science Competition',
      'Certificate in Computer Applications',
      'Volunteer at Local NGO'
    ],
    languages: [
      { name: 'English', proficiency: 'Fluent' },
      { name: 'Hindi', proficiency: 'Fluent' },
      { name: 'Urdu', proficiency: 'Fluent' }
    ]
  });

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      stream: '',
      year: '',
      percentage: '',
      achievements: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      duration: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const downloadResume = () => {
    // In a real app, this would generate and download a PDF
    alert('Resume download functionality will be available soon!');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resume Builder
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Create a professional resume using your profile information
        </p>
        
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={() => setActiveTab('preview')}
            variant={activeTab === 'preview' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </Button>
          <Button
            onClick={() => setActiveTab('edit')}
            variant={activeTab === 'edit' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </Button>
          <Button
            onClick={downloadResume}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="preview">
          {/* Resume Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {/* Header Section */}
                <div className="text-center border-b pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {resumeData.personalInfo.name || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{resumeData.personalInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{resumeData.personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{resumeData.personalInfo.district}, J&K</span>
                    </div>
                  </div>
                </div>

                {/* Objective */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Career Objective</span>
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {resumeData.personalInfo.objective}
                  </p>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Education</span>
                  </h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree} {edu.stream && `- ${edu.stream}`}
                        </h3>
                        <p className="text-gray-700">{edu.institution}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Year: {edu.year}</span>
                          {edu.percentage && <span>Marks: {edu.percentage}</span>}
                        </div>
                        {edu.achievements && (
                          <p className="text-sm text-blue-600 mt-1">{edu.achievements}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Skills</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
                      <Briefcase className="w-5 h-5" />
                      <span>Projects</span>
                    </h2>
                    <div className="space-y-4">
                      {resumeData.projects.map((project) => (
                        <div key={project.id} className="border-l-4 border-green-500 pl-4">
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-gray-700 mb-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Duration: {project.duration}</span>
                            <span>Technologies: {project.technologies}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Languages</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={index} className="text-center">
                        <p className="font-medium text-gray-900">{lang.name}</p>
                        <p className="text-sm text-gray-600">{lang.proficiency}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {resumeData.achievements.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Achievements</h2>
                    <ul className="space-y-2">
                      {resumeData.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="edit">
          {/* Resume Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={resumeData.personalInfo.district}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, district: e.target.value }
                      }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="objective">Career Objective</Label>
                  <Textarea
                    id="objective"
                    value={resumeData.personalInfo.objective}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, objective: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Education</span>
                  </CardTitle>
                  <Button onClick={addEducation} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index].institution = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEducation }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Degree/Class</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index].degree = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEducation }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Stream</Label>
                        <Input
                          value={edu.stream}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index].stream = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEducation }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index].year = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEducation }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addSkill(input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-center">
              <Button className="flex items-center space-x-2" size="lg">
                <Save className="w-4 h-4" />
                <span>Save Resume</span>
              </Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}