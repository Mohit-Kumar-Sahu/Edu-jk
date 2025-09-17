import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
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
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

export function ScholarshipChecker() {
  const { t } = useLocalization();
  const { user } = useAuth();
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [appliedScholarships, setAppliedScholarships] = useState<string[]>([]);

  // Use a localized data structure for scholarships
  const scholarships = [
    {
      id: 'pmsss',
      status: 'Open',
      deadline: '2024-03-31',
      link: 'https://www.aicte-india.org/schemes/PMSSS'
    },
    {
      id: 'nsp',
      status: 'Open',
      deadline: '2024-04-15',
      link: 'https://scholarships.gov.in'
    },
    {
      id: 'jk-merit',
      status: 'Open',
      deadline: '2024-05-31',
      link: '#'
    },
    {
      id: 'minority',
      status: 'Open',
      deadline: '2024-06-30',
      link: 'https://minorityaffairs.gov.in'
    },
    {
      id: 'inspire',
      status: 'Open',
      deadline: '2024-07-15',
      link: 'https://online-inspire.gov.in'
    }
  ].map(s => ({
    ...s,
    name: t(`scholarship_${s.id}_name`),
    provider: t(`scholarship_${s.id}_provider`),
    type: t(`scholarship_${s.id}_type`),
    amount: t(`scholarship_${s.id}_amount`),
    description: t(`scholarship_${s.id}_description`),
    benefits: t(`scholarship_${s.id}_benefits`).split(';'),
    documents: t(`scholarship_${s.id}_documents`).split(';')
  }));

  const checkEligibility = (scholarship: any) => {
    if (!user?.user_metadata) return null;

    const userProfile = user.user_metadata;
    const checks = {
      domicile: true, // We'll assume J&K domicile
      marks: true, // We'll assume eligible marks
      income: true, // We'll assume eligible income
      age: true // We'll assume eligible age
    };

    return {
      eligible: Object.values(checks).every(check => check),
      checks
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Closing Soon': return 'bg-orange-100 text-orange-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const applyForScholarship = (scholarshipId: string) => {
    setAppliedScholarships(prev => [...prev, scholarshipId]);
  };

  const eligibleScholarships = scholarships.filter(scholarship => {
    const eligibility = checkEligibility(scholarship);
    return eligibility?.eligible;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('scholarships_header_title')}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t('scholarships_header_subtitle')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{eligibleScholarships.length}</div>
            <div className="text-sm text-gray-600">{t('stat_eligible')}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{appliedScholarships.length}</div>
            <div className="text-sm text-gray-600">{t('stat_applied')}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{t('stat_max_amount')}</div>
            <div className="text-sm text-gray-600">{t('stat_max_amount_label')}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{t('stat_total_schemes')}</div>
            <div className="text-sm text-gray-600">{t('stat_total_schemes_label')}</div>
          </div>
        </div>
      </motion.div>

      {/* Profile Completion Alert */}
      {!user?.user_metadata?.district && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('alert_profile_completion')}
            <Button variant="link" className="p-0 h-auto ml-2">
              {t('button_update_profile')}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{t('tab_all_scholarships')}</TabsTrigger>
          <TabsTrigger value="eligible">{t('tab_eligible', { count: eligibleScholarships.length })}</TabsTrigger>
          <TabsTrigger value="applied">{t('tab_applied', { count: appliedScholarships.length })}</TabsTrigger>
          <TabsTrigger value="deadlines">{t('tab_deadlines')}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6">
            {scholarships.map((scholarship, index) => {
              const eligibility = checkEligibility(scholarship);
              const daysLeft = getDaysLeft(scholarship.deadline);
              const hasApplied = appliedScholarships.includes(scholarship.id);

              return (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`hover:shadow-lg transition-shadow ${eligibility?.eligible ? 'border-green-200' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 flex items-center space-x-2">
                            <Award className="w-5 h-5 text-orange-600" />
                            <span>{scholarship.name}</span>
                          </CardTitle>
                          <p className="text-gray-600 mb-3">{scholarship.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getStatusColor(scholarship.status)}>
                              {t(`status_${scholarship.status.toLowerCase().replace(' ', '_')}`)}
                            </Badge>
                            <Badge variant="outline">{scholarship.provider}</Badge>
                            <Badge variant="outline">{scholarship.type}</Badge>
                            {eligibility?.eligible && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t('badge_eligible')}
                              </Badge>
                            )}
                            {hasApplied && (
                              <Badge className="bg-blue-100 text-blue-800">
                                {t('badge_applied')}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{scholarship.amount}</div>
                          <div className="text-sm text-gray-500">{t('amount_per_year')}</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Key Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('heading_benefits')}</h4>
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
                          <h4 className="font-medium text-gray-900 mb-2">{t('heading_documents')}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {scholarship.documents.slice(0, 3).map((doc, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <FileText className="w-3 h-3 text-blue-500" />
                                <span>{doc}</span>
                              </li>
                            ))}
                            {scholarship.documents.length > 3 && (
                              <li className="text-blue-600 text-sm">
                                {t('documents_count', { count: scholarship.documents.length - 3 })}
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
                            <span>{t('label_deadline', { deadline: scholarship.deadline })}</span>
                          </div>
                          {daysLeft > 0 && daysLeft <= 30 && (
                            <div className="flex items-center space-x-2 text-sm text-orange-600">
                              <Clock className="w-4 h-4" />
                              <span>{t('days_left', { days: daysLeft })}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t('button_learn_more')}
                          </Button>
                          {eligibility?.eligible && !hasApplied && (
                            <Button 
                              size="sm"
                              onClick={() => applyForScholarship(scholarship.id)}
                            >
                              {t('button_apply_now')}
                            </Button>
                          )}
                          {hasApplied && (
                            <Button size="sm" variant="outline" disabled>
                              {t('button_applied_label')}
                            </Button>
                          )}
                          {!eligibility?.eligible && (
                            <Button size="sm" variant="outline" disabled>
                              {t('button_not_eligible')}
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

        <TabsContent value="eligible" className="space-y-4">
          <div className="grid gap-6">
            {eligibleScholarships.length > 0 ? (
              eligibleScholarships.map((scholarship, index) => (
                <Card key={scholarship.id} className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{scholarship.name}</span>
                      <Badge className="bg-green-100 text-green-800">{t('badge_eligible')}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{scholarship.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">{scholarship.amount}</span>
                      <Button>{t('button_apply_now')}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('no_eligible_title')}</h3>
                <p className="text-gray-500">{t('no_eligible_message')}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          <div className="grid gap-6">
            {appliedScholarships.length > 0 ? (
              scholarships
                .filter(s => appliedScholarships.includes(s.id))
                .map((scholarship) => (
                  <Card key={scholarship.id} className="border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span>{scholarship.name}</span>
                        <Badge className="bg-blue-100 text-blue-800">{t('badge_applied')}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-gray-600">{scholarship.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-green-600">{scholarship.amount}</span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">{t('button_view_application')}</Button>
                            <Button variant="outline" size="sm">{t('button_track_status')}</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('no_applications_title')}</h3>
                <p className="text-gray-500">{t('no_applications_message')}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <div className="grid gap-4">
            {scholarships
              .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
              .map((scholarship) => {
                const daysLeft = getDaysLeft(scholarship.deadline);
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
                            {daysLeft > 0 ? t('days_left', { days: daysLeft }) : t('deadline_passed')}
                          </div>
                          <Badge className={
                            daysLeft <= 7 ? 'bg-red-100 text-red-800' :
                            daysLeft <= 30 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                          }>
                            {daysLeft <= 7 ? t('label_urgent') : daysLeft <= 30 ? t('label_soon') : t('label_open')}
                          </Badge>
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