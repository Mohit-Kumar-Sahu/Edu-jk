import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Award, 
  BookOpen,
  AlertCircle,
  X,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLocalization } from '../hooks/useLocalization';

// Define the notification data structure to improve type safety and organization.
interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'exam' | 'scholarship' | 'application' | 'achievement' | 'reminder' | 'info';
    priority: 'high' | 'urgent' | 'normal' | 'low';
    timestamp: Date;
    read: boolean;
    actionUrl: string;
}

export function NotificationCenter() {
  const { t, currentLanguage } = useLocalization();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Create a function to generate notifications based on the current language.
  const createNotifications = (): Notification[] => [
    {
        id: '1',
        title: t('notif_cuet_title'),
        message: t('notif_cuet_message'),
        type: 'exam',
        priority: 'high',
        timestamp: new Date('2024-02-20T10:00:00'),
        read: false,
        actionUrl: 'https://cuet.samarth.ac.in'
    },
    {
        id: '2',
        title: t('notif_pmsss_title'),
        message: t('notif_pmsss_message'),
        type: 'scholarship',
        priority: 'urgent',
        timestamp: new Date('2024-02-19T14:30:00'),
        read: false,
        actionUrl: '#'
    },
    {
        id: '3',
        title: t('notif_gdc_title'),
        message: t('notif_gdc_message'),
        type: 'info',
        priority: 'normal',
        timestamp: new Date('2024-02-18T16:45:00'),
        read: true,
        actionUrl: '/colleges'
    },
    {
        id: '4',
        title: t('notif_app_status_title'),
        message: t('notif_app_status_message'),
        type: 'application',
        priority: 'normal',
        timestamp: new Date('2024-02-17T11:20:00'),
        read: false,
        actionUrl: '/applications'
    },
    {
        id: '5',
        title: t('notif_jee_title'),
        message: t('notif_jee_message'),
        type: 'exam',
        priority: 'high',
        timestamp: new Date('2024-02-16T09:15:00'),
        read: true,
        actionUrl: 'https://jeemain.nta.nic.in'
    },
    {
        id: '6',
        title: t('notif_quiz_complete_title'),
        message: t('notif_quiz_complete_message'),
        type: 'achievement',
        priority: 'normal',
        timestamp: new Date('2024-02-15T13:30:00'),
        read: true,
        actionUrl: '/quiz-results'
    },
    {
        id: '7',
        title: t('notif_nsp_title'),
        message: t('notif_nsp_message'),
        type: 'scholarship',
        priority: 'normal',
        timestamp: new Date('2024-02-14T12:00:00'),
        read: true,
        actionUrl: '/scholarships'
    },
    {
        id: '8',
        title: t('notif_profile_rem_title'),
        message: t('notif_profile_rem_message'),
        type: 'reminder',
        priority: 'low',
        timestamp: new Date('2024-02-13T08:45:00'),
        read: true,
        actionUrl: '/profile'
    }
  ];

  // Initialize and update notifications when the language changes.
  // This is the correct way to handle localization for initial state.
  useEffect(() => {
    setNotifications(createNotifications());
  }, [currentLanguage]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'exam': return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'scholarship': return <Award className="w-5 h-5 text-green-600" />;
      case 'application': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'achievement': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'reminder': return <Clock className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getTranslatedPriority = (priority: string) => {
      return t(`priority_${priority}`);
  };

  const getTranslatedType = (type: string) => {
      return t(`notif_type_${type}`);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return t('time_minutes_ago', { count: diffInMinutes });
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return t('time_hours_ago', { count: hours });
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return t('time_days_ago', { count: days });
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center space-x-3">
          <Bell className="w-8 h-8 text-blue-600" />
          <span>{t('notif_header_title')}</span>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount} {t('notif_header_new_badge')}</Badge>
          )}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t('notif_header_subtitle')}
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={t('notif_filter_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('notif_filter_all')}</SelectItem>
                    <SelectItem value="unread">{t('notif_filter_unread')}</SelectItem>
                    <SelectItem value="exam">{t('notif_filter_exams')}</SelectItem>
                    <SelectItem value="scholarship">{t('notif_filter_scholarships')}</SelectItem>
                    <SelectItem value="application">{t('notif_filter_applications')}</SelectItem>
                    <SelectItem value="achievement">{t('notif_filter_achievements')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-gray-600">
                  {t('notif_count', { count: filteredNotifications.length })}
                </div>
              </div>
              
              {unreadCount > 0 && (
                <Button 
                  onClick={markAllAsRead}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{t('notif_button_mark_all')}</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-md transition-shadow ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`text-lg font-semibold ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{formatTimestamp(notification.timestamp)}</span>
                            </div>
                            
                            <Badge className={getPriorityColor(notification.priority)}>
                              {getTranslatedPriority(notification.priority)}
                            </Badge>
                            
                            <Badge variant="outline" className="capitalize">
                              {getTranslatedType(notification.type)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {notification.actionUrl && (
                        <div className="mt-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              if (notification.actionUrl.startsWith('http')) {
                                window.open(notification.actionUrl, '_blank');
                              } else {
                                // Navigate to internal route
                                window.location.href = notification.actionUrl;
                              }
                              markAsRead(notification.id);
                            }}
                          >
                            {t('notif_view_details_btn')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {filter === 'unread' ? t('notif_empty_unread_title') : t('notif_empty_all_title')}
            </h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? t('notif_empty_unread_message')
                : t('notif_empty_all_message')
              }
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{t('notif_settings_title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">{t('notif_settings_exam_h')}</h4>
                <p className="text-sm text-blue-700">{t('notif_settings_exam_p')}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">{t('notif_settings_scholarship_h')}</h4>
                <p className="text-sm text-green-700">{t('notif_settings_scholarship_p')}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">{t('notif_settings_application_h')}</h4>
                <p className="text-sm text-purple-700">{t('notif_settings_application_p')}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">{t('notif_settings_guidance_h')}</h4>
                <p className="text-sm text-orange-700">{t('notif_settings_guidance_p')}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">
                {t('notif_settings_button')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}