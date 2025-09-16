import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Award, 
  BookOpen,
  AlertCircle,
  X,
  Filter,
  MarkAsRead
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function NotificationCenter() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'CUET Application Open',
      message: 'Common University Entrance Test (CUET) applications are now open. Last date to apply: March 15, 2024',
      type: 'exam',
      priority: 'high',
      timestamp: new Date('2024-02-20T10:00:00'),
      read: false,
      actionUrl: 'https://cuet.samarth.ac.in'
    },
    {
      id: '2',
      title: 'PMSSS Scholarship Deadline Approaching',
      message: 'Only 10 days left to apply for Prime Minister Special Scholarship Scheme. Don\'t miss this opportunity!',
      type: 'scholarship',
      priority: 'urgent',
      timestamp: new Date('2024-02-19T14:30:00'),
      read: false,
      actionUrl: '#'
    },
    {
      id: '3',
      title: 'New College Added: GDC Kupwara',
      message: 'Government Degree College Kupwara has been added to our database with course details and admission information.',
      type: 'info',
      priority: 'normal',
      timestamp: new Date('2024-02-18T16:45:00'),
      read: true,
      actionUrl: '/colleges'
    },
    {
      id: '4',
      title: 'Application Status Update',
      message: 'Your application to Government Degree College Srinagar has been updated to "Under Review".',
      type: 'application',
      priority: 'normal',
      timestamp: new Date('2024-02-17T11:20:00'),
      read: false,
      actionUrl: '/applications'
    },
    {
      id: '5',
      title: 'JEE Main Registration Started',
      message: 'Joint Entrance Examination (Main) registration for April session has started. Register now!',
      type: 'exam',
      priority: 'high',
      timestamp: new Date('2024-02-16T09:15:00'),
      read: true,
      actionUrl: 'https://jeemain.nta.nic.in'
    },
    {
      id: '6',
      title: 'Career Quiz Completed',
      message: 'Congratulations! You have successfully completed your career assessment quiz. View your personalized results.',
      type: 'achievement',
      priority: 'normal',
      timestamp: new Date('2024-02-15T13:30:00'),
      read: true,
      actionUrl: '/quiz-results'
    },
    {
      id: '7',
      title: 'NSP Scholarship Portal Updated',
      message: 'National Scholarship Portal has been updated with new schemes for J&K students. Check eligibility now.',
      type: 'scholarship',
      priority: 'normal',
      timestamp: new Date('2024-02-14T12:00:00'),
      read: true,
      actionUrl: '/scholarships'
    },
    {
      id: '8',
      title: 'Profile Completion Reminder',
      message: 'Your profile is 75% complete. Complete it to get more accurate career recommendations.',
      type: 'reminder',
      priority: 'low',
      timestamp: new Date('2024-02-13T08:45:00'),
      read: true,
      actionUrl: '/profile'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'scholarship': return <Award className="w-5 h-5 text-green-600" />;
      case 'application': return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'achievement': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'reminder': return <Clock className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
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
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount} new</Badge>
          )}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay updated with exams, scholarships, and important announcements
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
                    <SelectValue placeholder="Filter notifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="exam">Exams</SelectItem>
                    <SelectItem value="scholarship">Scholarships</SelectItem>
                    <SelectItem value="application">Applications</SelectItem>
                    <SelectItem value="achievement">Achievements</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-gray-600">
                  {filteredNotifications.length} notifications
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
                  <span>Mark All as Read</span>
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
                              {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                            </Badge>
                            
                            <Badge variant="outline" className="capitalize">
                              {notification.type}
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
                            View Details
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
              {filter === 'unread' ? 'No Unread Notifications' : 'No Notifications'}
            </h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? 'You\'re all caught up! All notifications have been read.'
                : 'You don\'t have any notifications yet. Check back later for updates.'
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
              <span>Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Exam Notifications</h4>
                <p className="text-sm text-blue-700">Get notified about important exam dates and registration deadlines</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Scholarship Updates</h4>
                <p className="text-sm text-green-700">Stay informed about new scholarships and application deadlines</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Application Status</h4>
                <p className="text-sm text-purple-700">Receive updates on your college application status</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Career Guidance</h4>
                <p className="text-sm text-orange-700">Get tips and advice for your career development</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">
                Manage Notification Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}