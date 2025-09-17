import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  Calendar,
  DollarSign,
  Users,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLocalization } from '../hooks/useLocalization';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  if (status.includes('Open')) {
    return 'bg-green-100 text-green-800';
  } else if (status.includes('Closing Soon')) {
    return 'bg-yellow-100 text-yellow-800';
  } else {
    return 'bg-red-100 text-red-800';
  }
};

export function ScholarshipChecker() {
  const { t } = useLocalization();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [appliedScholarships, setAppliedScholarships] = useState<string[]>([]);
  
  // Static scholarship data, keyed by ID for easy access
  const scholarshipData = [
    { id: 'pmsss', status: 'Open', deadline: '2024-03-31', link: 'https://www.aicte-india.org/schemes/PMSSS' },
    { id: 'nsp', status: 'Open', deadline: '2024-04-15', link: 'https://scholarships.gov.in' },
    { id: 'jk-merit', status: 'Open', deadline: '2024-05-31', link: '#' },
    { id: 'minority', status: 'Open', deadline: '2024-06-30', link: 'https://minorityaffairs.gov.in' },
    { id: 'inspire', status: 'Open', deadline: '2024-07-15', link: 'https://online-inspire.gov.in' }
  ];

  // Map over the static data to get localized content
  const scholarships = scholarshipData.map(s => ({
    ...s,
    name: t(`scholarships.scholarship_${s.id}_name`),
    provider: t(`scholarships.scholarship_${s.id}_provider`),
    type: t(`scholarships.scholarship_${s.id}_type`),
    amount: t(`scholarships.scholarship_${s.id}_amount`),
    description: t(`scholarships.scholarship_${s.id}_description`),
    benefits: t(`scholarships.scholarship_${s.id}_benefits`).split(';'),
    documents: t(`scholarships.scholarship_${s.id}_documents`).split(';')
  }));

  // Simplified eligibility check based on user profile
  const checkEligibility = (scholarship: any) => {
    // This is a placeholder; you'd add real eligibility logic here
    return true; 
  };

  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  const handleApply = (scholarshipId: string) => {
    setAppliedScholarships(prev => [...prev, scholarshipId]);
  };

  // Filter scholarships based on current tab
  const eligibleScholarships = scholarships.filter(s => checkEligibility(s) && !appliedScholarships.includes(s.id));
  const appliedScholarshipData = scholarships.filter(s => appliedScholarships.includes(s.id));
  const deadlineScholarships = [...scholarships].sort((a, b) => getDaysLeft(a.deadline) - getDaysLeft(b.deadline));
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('scholarships.header_title')}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t('scholarships.header_subtitle')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{eligibleScholarships.length}</div>
            <div className="text-sm text-gray-600">{t('scholarships.stat_eligible')}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{appliedScholarshipData.length}</div>
            <div className="text-sm text-gray-600">{t('scholarships.stat_applied')}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{t('scholarships.stat_max_amount')}</div>
            <div className="text-sm text-gray-600">{t('scholarships.stat_max_amount_label')}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{t('scholarships.stat_total_schemes')}</div>
            <div className="text-sm text-gray-600">{t('scholarships.stat_total_schemes_label')}</div>
          </div>
        </div>
      </motion.div>

      {/* Profile Completion Alert */}
      {!user?.user_metadata?.district && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('scholarships.alert_profile_completion')}
            <Button variant="link" className="p-0 h-auto ml-2">
              {t('scholarships.button_update_profile')}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t('scholarships.tab_all_scholarships')}</TabsTrigger>
          <TabsTrigger value="eligible">{t('scholarships.tab_eligible', { count: eligibleScholarships.length })}</TabsTrigger>
          <TabsTrigger value="applied">{t('scholarships.tab_applied', { count: appliedScholarshipData.length })}</TabsTrigger>
          <TabsTrigger value="deadlines">{t('scholarships.tab_deadlines')}</TabsTrigger>
        </TabsList>

        {/* All Scholarships Tab */}
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6">
            {scholarships.map((scholarship, index) => {
              const daysLeft = getDaysLeft(scholarship.deadline);
              const hasApplied = appliedScholarships.includes(scholarship.id);
              const isEligible = checkEligibility(scholarship);
              let statusText = t('scholarships.status_open');
              if (daysLeft <= 15 && daysLeft > 0) statusText = t('scholarships.status_closing_soon');
              if (daysLeft <= 0) statusText = t('scholarships.status_closed');

              return (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`hover:shadow-lg transition-shadow ${isEligible ? 'border-green-200' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 flex items-center space-x-2">
                            <Award className="w-5 h-5 text-orange-600" />
                            <span>{scholarship.name}</span>
                          </CardTitle>
                          <p className="text-gray-600 mb-3">{scholarship.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getStatusColor(statusText)}>{statusText}</Badge>
                            <Badge variant="outline">{scholarship.provider}</Badge>
                            <Badge variant="outline">{scholarship.type}</Badge>
                            {isEligible && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t('scholarships.badge_eligible')}
                              </Badge>
                            )}
                            {hasApplied && (
                              <Badge className="bg-blue-100 text-blue-800">
                                {t('scholarships.badge_applied')}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{scholarship.amount}</div>
                          <div className="text-sm text-gray-500">{t('scholarships.amount_per_year')}</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Key Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('scholarships.heading_benefits')}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {scholarship.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('scholarships.heading_documents')}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {scholarship.documents.slice(0, 3).map((doc, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <FileText className="w-3 h-3 text-blue-500" />
                                <span>{doc}</span>
                              </li>
                            ))}
                            {scholarship.documents.length > 3 && (
                              <li className="text-blue-600 text-sm">
                                {t('scholarships.documents_count', { count: scholarship.documents.length - 3 })}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Deadline and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span>
                              {daysLeft > 0 
                                ? t('scholarships.label_deadline', { deadline: new Date(scholarship.deadline).toLocaleDateString() })
                                : t('scholarships.deadline_passed')
                              }
                            </span>
                          </div>
                          {daysLeft > 0 && daysLeft <= 30 && (
                            <div className="flex items-center space-x-2 text-sm text-orange-600">
                              <Calendar className="w-4 h-4" />
                              <span>{t('scholarships.days_left', { days: daysLeft })}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t('scholarships.button_learn_more')}
                          </Button>
                          {isEligible && !hasApplied && (
                            <Button 
                              size="sm"
                              onClick={() => handleApply(scholarship.id)}
                            >
                              {t('scholarships.button_apply_now')}
                            </Button>
                          )}
                          {hasApplied && (
                            <Button size="sm" variant="outline" disabled>
                              {t('scholarships.button_applied_label')}
                            </Button>
                          )}
                          {!isEligible && (
                            <Button size="sm" variant="outline" disabled>
                              {t('scholarships.button_not_eligible')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* Eligible Scholarships Tab */}
        <TabsContent value="eligible" className="space-y-4">
          <div className="grid gap-6">
            {eligibleScholarships.length > 0 ? (
              eligibleScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{scholarship.name}</span>
                      <Badge className="bg-green-100 text-green-800">{t('scholarships.badge_eligible')}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{scholarship.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">{scholarship.amount}</span>
                      <Button onClick={() => handleApply(scholarship.id)}>{t('scholarships.button_apply_now')}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('scholarships.no_eligible_title')}</h3>
                <p className="text-gray-500">{t('scholarships.no_eligible_message')}</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Applied Scholarships Tab */}
        <TabsContent value="applied" className="space-y-4">
          <div className="grid gap-6">
            {appliedScholarshipData.length > 0 ? (
              appliedScholarshipData.map((scholarship) => (
                <Card key={scholarship.id} className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <span>{scholarship.name}</span>
                      <Badge className="bg-blue-100 text-blue-800">{t('scholarships.badge_applied')}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-600">{scholarship.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">{scholarship.amount}</span>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">{t('scholarships.button_view_application')}</Button>
                          <Button variant="outline" size="sm">{t('scholarships.button_track_status')}</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('scholarships.no_applications_title')}</h3>
                <p className="text-gray-500">{t('scholarships.no_applications_message')}</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Deadlines Tab */}
        <TabsContent value="deadlines" className="space-y-4">
          <div className="grid gap-4">
            {deadlineScholarships.map((scholarship) => {
              const daysLeft = getDaysLeft(scholarship.deadline);
              let badgeType = t('scholarships.label_open');
              if (daysLeft <= 7) badgeType = t('scholarships.label_urgent');
              else if (daysLeft <= 30) badgeType = t('scholarships.label_soon');
              
              const badgeColorClass = daysLeft <= 7 ? 'bg-red-100 text-red-800' :
                                      daysLeft <= 30 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800';

              return (
                <Card key={scholarship.id} className={daysLeft <= 7 ? 'border-red-200' : daysLeft <= 30 ? 'border-orange-200' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{scholarship.name}</h4>
                        <p className="text-sm text-gray-600">{scholarship.deadline}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          daysLeft <= 7 ? 'text-red-600' : 
                          daysLeft <= 30 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {daysLeft > 0 ? t('scholarships.days_left', { days: daysLeft }) : t('scholarships.deadline_passed')}
                        </div>
                        <Badge className={badgeColorClass}>{badgeType}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}