import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, BookOpen, Save, Edit2, Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    district: user?.user_metadata?.district || '',
    currentClass: user?.user_metadata?.currentClass || '',
    stream: user?.user_metadata?.stream || '',
    schoolCollege: user?.user_metadata?.schoolCollege || '',
    dateOfBirth: user?.user_metadata?.dateOfBirth || '',
    gender: user?.user_metadata?.gender || '',
    category: user?.user_metadata?.category || '',
    fatherName: user?.user_metadata?.fatherName || '',
    motherName: user?.user_metadata?.motherName || '',
    familyIncome: user?.user_metadata?.familyIncome || '',
    address: user?.user_metadata?.address || '',
    pincode: user?.user_metadata?.pincode || '',
    careerInterests: user?.user_metadata?.careerInterests || [],
    achievements: user?.user_metadata?.achievements || '',
    skills: user?.user_metadata?.skills || []
  });

  const districts = [
    'Srinagar', 'Jammu', 'Baramulla', 'Budgam', 'Anantnag', 'Kupwara', 'Kulgam', 'Shopian',
    'Pulwama', 'Ganderbal', 'Bandipora', 'Kathua', 'Udhampur', 'Doda', 'Ramban', 'Kishtwar',
    'Poonch', 'Rajouri', 'Reasi', 'Samba'
  ];

  const calculateProfileCompletion = () => {
    const fields = [
      profileData.name, profileData.email, profileData.phone, profileData.district,
      profileData.currentClass, profileData.stream, profileData.schoolCollege,
      profileData.dateOfBirth, profileData.gender, profileData.fatherName,
      profileData.motherName, profileData.address, profileData.pincode
    ];
    const completed = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In real app, this would update user profile via Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-lg text-gray-600">Manage your personal information and preferences</p>
      </motion.div>

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Profile Completion
              <Badge variant={profileCompletion === 100 ? "default" : "secondary"}>
                {profileCompletion}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="w-full mb-2" />
            <p className="text-sm text-gray-600">
              {profileCompletion === 100 
                ? "Your profile is complete! You'll get the most accurate recommendations."
                : "Complete your profile to get personalized career and scholarship recommendations."
              }
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-1/2 transform translate-x-16 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{profileData.name || 'Student'}</h3>
              <p className="text-gray-600">{profileData.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {profileData.currentClass} {profileData.stream && `- ${profileData.stream}`}
              </p>
              <p className="text-sm text-gray-500">{profileData.district}, Jammu & Kashmir</p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Quiz Taken</span>
                <Badge variant="secondary">Yes</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Colleges Saved</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Applications</span>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profile Views</span>
                <Badge variant="secondary">12</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Basic Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={true} // Email usually can't be changed
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={profileData.gender} onValueChange={(value) => setProfileData({...profileData, gender: value})} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={profileData.category} onValueChange={(value) => setProfileData({...profileData, category: value})} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="obc">OBC</SelectItem>
                        <SelectItem value="sc">SC</SelectItem>
                        <SelectItem value="st">ST</SelectItem>
                        <SelectItem value="ews">EWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Educational Information */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Educational Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentClass">Current Class/Level *</Label>
                    <Select value={profileData.currentClass} onValueChange={(value) => setProfileData({...profileData, currentClass: value})} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
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
                  <div>
                    <Label htmlFor="stream">Stream *</Label>
                    <Select value={profileData.stream} onValueChange={(value) => setProfileData({...profileData, stream: value})} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Commerce">Commerce</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Vocational">Vocational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="schoolCollege">School/College Name *</Label>
                    <Input
                      id="schoolCollege"
                      value={profileData.schoolCollege}
                      onChange={(e) => setProfileData({...profileData, schoolCollege: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Address Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Select value={profileData.district} onValueChange={(value) => setProfileData({...profileData, district: value})} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
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
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={profileData.pincode}
                      onChange={(e) => setProfileData({...profileData, pincode: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Family Information */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Family Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      value={profileData.fatherName}
                      onChange={(e) => setProfileData({...profileData, fatherName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={profileData.motherName}
                      onChange={(e) => setProfileData({...profileData, motherName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="familyIncome">Annual Family Income</Label>
                    <Select value={profileData.familyIncome} onValueChange={(value) => setProfileData({...profileData, familyIncome: value})} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-1-lakh">Below ₹1 Lakh</SelectItem>
                        <SelectItem value="1-3-lakh">₹1-3 Lakh</SelectItem>
                        <SelectItem value="3-5-lakh">₹3-5 Lakh</SelectItem>
                        <SelectItem value="5-8-lakh">₹5-8 Lakh</SelectItem>
                        <SelectItem value="above-8-lakh">Above ₹8 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Achievements & Skills</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="achievements">Academic Achievements</Label>
                    <Textarea
                      id="achievements"
                      value={profileData.achievements}
                      onChange={(e) => setProfileData({...profileData, achievements: e.target.value})}
                      disabled={!isEditing}
                      placeholder="List your academic achievements, awards, competitions, etc."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}