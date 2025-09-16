import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download,
  Calendar,
  MapPin,
  School,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ApplicationTracker() {
  const [applications] = useState([
    {
      id: '1',
      collegeName: 'Government Degree College Srinagar',
      course: 'B.Sc Computer Science',
      applicationId: 'GDC-SRG-2024-001234',
      submittedDate: '2024-02-15',
      status: 'Under Review',
      lastUpdated: '2024-02-20',
      documents: ['Class 12 Marks Sheet', 'Domicile Certificate', 'Category Certificate'],
      fees: 2500,
      deadline: '2024-03-15',
      progress: 60
    },
    {
      id: '2',
      collegeName: 'Government Degree College Jammu',
      course: 'B.Com Honours',
      applicationId: 'GDC-JMU-2024-005678',
      submittedDate: '2024-02-10',
      status: 'Accepted',
      lastUpdated: '2024-02-25',
      documents: ['Class 12 Marks Sheet', 'Domicile Certificate', 'Income Certificate'],
      fees: 2000,
      deadline: '2024-03-01',
      progress: 100
    },
    {
      id: '3',
      collegeName: 'Government Degree College Baramulla',
      course: 'B.A Political Science',
      applicationId: 'GDC-BAR-2024-009876',
      submittedDate: '2024-02-20',
      status: 'Documents Required',
      lastUpdated: '2024-02-22',
      documents: ['Class 12 Marks Sheet', 'Domicile Certificate'],
      missingDocs: ['Transfer Certificate'],
      fees: 1800,
      deadline: '2024-03-20',
      progress: 40
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Documents Required': return 'bg-orange-100 text-orange-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Under Review': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Documents Required': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const acceptedApplications = applications.filter(app => app.status === 'Accepted');
  const pendingApplications = applications.filter(app => !['Accepted', 'Rejected'].includes(app.status));
  const totalApplications = applications.length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Tracker
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Track your college applications and their status
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalApplications}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{pendingApplications.length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{acceptedApplications.length}</div>
            <div className="text-sm text-gray-600">Accepted</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">₹6,300</div>
            <div className="text-sm text-gray-600">Total Fees</div>
          </div>
        </div>
      </motion.div>

      {/* Applications Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedApplications.length})</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {applications.map((application, index) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 flex items-center space-x-2">
                          <School className="w-5 h-5 text-blue-600" />
                          <span>{application.collegeName}</span>
                        </CardTitle>
                        <p className="text-gray-600 mb-2">{application.course}</p>
                        <p className="text-sm text-gray-500">Application ID: {application.applicationId}</p>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">
                          Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Application Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="w-full" />
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Submitted: {new Date(application.submittedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium">Fees: ₹{application.fees.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Documents Submitted</h4>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {application.documents.map((doc) => (
                          <Badge key={doc} variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                      
                      {application.missingDocs && application.missingDocs.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-orange-600 mb-1">Missing Documents:</h5>
                          <div className="flex flex-wrap gap-1">
                            {application.missingDocs.map((doc) => (
                              <Badge key={doc} variant="outline" className="text-xs border-orange-300 text-orange-600">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Receipt
                        </Button>
                      </div>
                      
                      {application.status === 'Documents Required' && (
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Upload Documents
                        </Button>
                      )}
                      
                      {application.status === 'Accepted' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Confirm Admission
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="space-y-4">
            {pendingApplications.length > 0 ? (
              pendingApplications.map((application) => (
                <Card key={application.id} className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span>{application.collegeName}</span>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{application.course}</p>
                    <div className="flex items-center justify-between">
                      <span>Progress: {application.progress}%</span>
                      <Button size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Pending Applications</h3>
                <p className="text-gray-500">All your applications have been processed</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <div className="space-y-4">
            {acceptedApplications.length > 0 ? (
              acceptedApplications.map((application) => (
                <Card key={application.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{application.collegeName}</span>
                      <Badge className="bg-green-100 text-green-800">Congratulations! 🎉</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{application.course}</p>
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-green-900 mb-2">Next Steps:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Confirm your admission by March 31, 2024</li>
                        <li>• Pay the admission fees: ₹{application.fees.toLocaleString()}</li>
                        <li>• Submit original documents at the college</li>
                        <li>• Attend the orientation program</li>
                      </ul>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Confirm Admission
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Accepted Applications</h3>
                <p className="text-gray-500">Your accepted applications will appear here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <div className="space-y-4">
            {applications
              .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
              .map((application) => {
                const daysLeft = Math.ceil((new Date(application.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <Card key={application.id} className={daysLeft <= 7 ? 'border-red-200' : daysLeft <= 14 ? 'border-orange-200' : ''}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{application.collegeName}</h4>
                          <p className="text-sm text-gray-600">{application.course}</p>
                          <p className="text-sm text-gray-500">{application.deadline}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            daysLeft <= 7 ? 'text-red-600' : 
                            daysLeft <= 14 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                          </div>
                          <Badge className={
                            daysLeft <= 7 ? 'bg-red-100 text-red-800' :
                            daysLeft <= 14 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                          }>
                            {daysLeft <= 7 ? 'Urgent' : daysLeft <= 14 ? 'Soon' : 'On Time'}
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