import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Edit2, Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocalization } from '../hooks/useLocalization';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function ProfilePage() {
  const { t } = useLocalization();
  const { user, getToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    district: '',
    currentClass: '',
    stream: '',
    schoolCollege: '',
    dateOfBirth: '',
    gender: '',
    category: '',
    fatherName: '',
    motherName: '',
    familyIncome: '',
    address: '',
    pincode: '',
    careerInterests: [],
    achievements: '',
    skills: []
  });

  const districts = ['Srinagar', 'Jammu', 'Baramulla', 'Budgam', 'Anantnag', 'Kupwara', 'Kulgam', 'Shopian', 'Pulwama', 'Ganderbal', 'Bandipora', 'Kathua', 'Udhampur', 'Doda', 'Ramban', 'Kishtwar', 'Poonch', 'Rajouri', 'Reasi', 'Samba'];
  const categories = ['general', 'obc', 'sc', 'st', 'ews'];
  const classes = ['10th', '11th', '12th', 'Graduate', 'Post Graduate'];
  const streams = ['Science', 'Commerce', 'Arts', 'Vocational'];
  const genders = ['male', 'female', 'other'];
  const familyIncomes = ['below-1-lakh', '1-3-lakh', '3-5-lakh', '5-8-lakh', 'above-8-lakh'];

  useEffect(() => {
    if (user && getToken) {
      const fetchProfileData = async () => {
        setIsLoading(true);
        try {
          const token = await getToken();
          const response = await fetch('/api/profile/me', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (response.status === 404) {
            console.warn("No profile in DB, using initial data from auth provider.");
            setProfileData(prev => ({ ...prev, name: user.displayName || '', email: user.email || '' }));
            return;
          }
          if (!response.ok) throw new Error('Failed to fetch profile data');

          const data = await response.json();
          if (data.dateOfBirth) {
            data.dateOfBirth = data.dateOfBirth.split('T')[0];
          }
          setProfileData(prevData => ({ ...prevData, ...data }));
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfileData();
    } else if (!user) {
      setIsLoading(false);
    }
  }, [user, getToken]);

  const calculateProfileCompletion = () => {
    const requiredFields = ['name', 'email', 'phone', 'district', 'currentClass', 'stream', 'schoolCollege', 'dateOfBirth', 'gender', 'fatherName', 'motherName', 'address', 'pincode'];
    const completed = requiredFields.filter(key => {
      // --- FIX 1: Removed TypeScript 'as' syntax ---
      const value = profileData[key];
      return !!value && (typeof value !== 'string' || value.trim() !== '');
    }).length;
    return Math.round((completed / requiredFields.length) * 100);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Authentication token not found.");
      const response = await fetch('/api/profile/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const result = await response.json();
      if (result.user) {
        const serverData = result.user;
        if (serverData.dateOfBirth) {
            serverData.dateOfBirth = serverData.dateOfBirth.split('T')[0];
        }
        setProfileData(serverData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const profileCompletion = calculateProfileCompletion();

  if (isLoading) {
    return <div className="p-6 text-center text-xl">Loading Your Profile...</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header and Profile Completion sections are correct */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('profile.profile_title')}</h1>
        <p className="text-lg text-gray-600">{t('profile.profile_subtitle')}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {t('profile.profile_completion_title')}
              <Badge variant={profileCompletion === 100 ? "default" : "secondary"}>
                {profileCompletion}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={profileCompletion} className="w-full mb-2" />
            <p className="text-sm text-gray-600">
              {profileCompletion === 100 
                ? t('profile.profile_completion_message_complete')
                : t('profile.profile_completion_message_incomplete')
              }
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile picture section is correct */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.profile_pic_title')}</CardTitle>
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
                {profileData.currentClass && t(`profile.class_${profileData.currentClass.toLowerCase().replace(' ', '_')}`)} {profileData.stream && `- ${t(`profile.stream_${profileData.stream.toLowerCase()}`)}`}
              </p>
              <p className="text-sm text-gray-500">
                {profileData.district && t(`profile.district_${profileData.district.toLowerCase()}`)}, {t('profile.jammu_kashmir')}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* --- FIX 2: Applied '|| ""' to all form values for robustness --- */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('profile.personal_info_title')}</CardTitle>
                <Button variant={isEditing ? "outline" : "default"} onClick={() => setIsEditing(!isEditing)}>
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? t('profile.button_cancel') : t('profile.button_edit_profile')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('profile.basic_info_title')}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('profile.label_full_name')}</Label>
                    <Input id="name" value={profileData.name || ''} onChange={(e) => setProfileData({...profileData, name: e.target.value})} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('profile.label_email')}</Label>
                    <Input id="email" type="email" value={profileData.email || ''} disabled={true} />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('profile.label_phone')}</Label>
                    <Input id="phone" value={profileData.phone || ''} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="dob">{t('profile.label_dob')}</Label>
                    <Input id="dob" type="date" value={profileData.dateOfBirth || ''} onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="gender">{t('profile.label_gender')}</Label>
                    <Select value={profileData.gender || ''} onValueChange={(value) => setProfileData({...profileData, gender: value})} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder={t('profile.placeholder_select_gender')} /></SelectTrigger>
                      <SelectContent>{genders.map(gender => (<SelectItem key={gender} value={gender}>{t(`profile.gender_${gender}`)}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">{t('profile.label_category')}</Label>
                    <Select value={profileData.category || ''} onValueChange={(value) => setProfileData({...profileData, category: value})} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder={t('profile.placeholder_select_category')} /></SelectTrigger>
                      <SelectContent>{categories.map(category => (<SelectItem key={category} value={category}>{t(`profile.category_${category}`)}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('profile.educational_info_title')}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentClass">{t('profile.label_current_class')}</Label>
                    <Select value={profileData.currentClass || ''} onValueChange={(value) => setProfileData({...profileData, currentClass: value})} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder={t('profile.placeholder_select_class')} /></SelectTrigger>
                      <SelectContent>{classes.map(cls => (<SelectItem key={cls} value={cls}>{t(`profile.class_${cls.toLowerCase().replace(' ', '_')}`)}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stream">{t('profile.label_stream')}</Label>
                    <Select value={profileData.stream || ''} onValueChange={(value) => setProfileData({...profileData, stream: value})} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder={t('profile.placeholder_select_stream')} /></SelectTrigger>
                      <SelectContent>{streams.map(stream => (<SelectItem key={stream} value={stream}>{t(`profile.stream_${stream.toLowerCase()}`)}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="schoolCollege">{t('profile.label_school_college')}</Label>
                    <Input id="schoolCollege" value={profileData.schoolCollege || ''} onChange={(e) => setProfileData({...profileData, schoolCollege: e.target.value})} disabled={!isEditing} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('profile.address_info_title')}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">{t('profile.label_district')}</Label>
                    <Select value={profileData.district || ''} onValueChange={(value) => setProfileData({...profileData, district: value})} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder={t('profile.placeholder_select_district')} /></SelectTrigger>
                      <SelectContent>{districts.map((district) => (<SelectItem key={district} value={district}>{t(`profile.district_${district.toLowerCase()}`)}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pincode">{t('profile.label_pincode')}</Label>
                    <Input id="pincode" value={profileData.pincode || ''} onChange={(e) => setProfileData({...profileData, pincode: e.target.value})} disabled={!isEditing} />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">{t('profile.label_full_address')}</Label>
                    <Textarea id="address" value={profileData.address || ''} onChange={(e) => setProfileData({...profileData, address: e.target.value})} disabled={!isEditing} rows={3} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">{t('profile.family_info_title')}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fatherName">{t('profile.label_father_name')}</Label>
                    <Input id="fatherName" value={profileData.fatherName || ''} onChange={(e) => setProfileData({...profileData, fatherName: e.target.value})} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="motherName">{t('profile.label_mother_name')}</Label>
                    <Input id="motherName" value={profileData.motherName || ''} onChange={(e) => setProfileData({...profileData, motherName: e.target.value})} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="familyIncome">{t('profile.label_family_income')}</Label>
                    <Select value={profileData.familyIncome || ''} onValueChange={(value) => setProfileData({...profileData, familyIncome: value})} disabled={!isEditing}>
                      <SelectTrigger><SelectValue placeholder={t('profile.placeholder_select_income')} /></SelectTrigger>
                      <SelectContent>{familyIncomes.map(income => (<SelectItem key={income} value={income}>{t(`profile.income_${income.toLowerCase().replace(/-/g, '_')}`)}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {t('profile.button_cancel')}
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving} className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? t('profile.button_saving') : t('profile.button_save_changes')}</span>
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