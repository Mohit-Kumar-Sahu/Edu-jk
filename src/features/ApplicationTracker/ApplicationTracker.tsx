import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Upload,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Textarea } from '../../components/ui/textarea';
import { useAuth } from '../../hooks/useAuth';

interface Application {
  id: string;
  collegeName: string;
  course: string;
  applicationType: 'college' | 'scholarship';
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'interview_scheduled';
  submittedDate?: string;
  deadline?: string;
  documents: string[];
  notes: string;
  priority: 'low' | 'medium' | 'high';
  district: string;
}

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800', icon: Clock },
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  interview_scheduled: { label: 'Interview Scheduled', color: 'bg-purple-100 text-purple-800', icon: Calendar }
};

export function ApplicationTracker() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);

  // Mock data - replace with API calls
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: '1',
        collegeName: 'Government Degree College, Srinagar',
        course: 'B.Sc. Computer Science',
        applicationType: 'college',
        status: 'submitted',
        submittedDate: '2024-01-15',
        deadline: '2024-02-28',
        documents: ['marksheet.pdf', 'domicile.pdf', 'photo.jpg'],
        notes: 'Applied for merit seat. Waiting for merit list.',
        priority: 'high',
        district: 'Srinagar'
      },
      {
        id: '2',
        collegeName: 'PMSSS Scholarship',
        course: 'Engineering',
        applicationType: 'scholarship',
        status: 'approved',
        submittedDate: '2024-01-10',
        deadline: '2024-03-15',
        documents: ['income_certificate.pdf', 'marksheet.pdf', 'bank_details.pdf'],
        notes: 'Approved for PMSSS scholarship. Amount: ₹1,20,000/year',
        priority: 'high',
        district: 'Srinagar'
      },
      {
        id: '3',
        collegeName: 'Government Degree College, Jammu',
        course: 'B.Com',
        applicationType: 'college',
        status: 'under_review',
        submittedDate: '2024-01-20',
        deadline: '2024-02-15',
        documents: ['marksheet.pdf', 'domicile.pdf'],
        notes: 'Applied for reserved category seat.',
        priority: 'medium',
        district: 'Jammu'
      }
    ];
    setApplications(mockApplications);
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.applicationType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusStats = () => {
    const stats = {
      total: applications.length,
      submitted: applications.filter(app => app.status === 'submitted').length,
      approved: applications.filter(app => app.status === 'approved').length,
      pending: applications.filter(app => ['draft', 'submitted', 'under_review'].includes(app.status)).length
    };
    return stats;
  };

  const stats = getStatusStats();

  const handleAddApplication = (newApplication: Omit<Application, 'id'>) => {
    const application: Application = {
      ...newApplication,
      id: Date.now().toString()
    };
    setApplications(prev => [...prev, application]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateApplication = (updatedApplication: Application) => {
    setApplications(prev => prev.map(app =>
      app.id === updatedApplication.id ? updatedApplication : app
    ));
    setEditingApplication(null);
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
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
          Application Tracker
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Track and manage your college and scholarship applications
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.submitted}</div>
            <div className="text-sm text-gray-600">Submitted</div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Filter Applications</span>
              </span>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Application
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <ApplicationForm onSubmit={handleAddApplication} />
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="scholarship">Scholarship</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Applications List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredApplications.map((application, index) => {
          const StatusIcon = statusConfig[application.status].icon;
          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.collegeName}
                        </h3>
                        <Badge className={statusConfig[application.status].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[application.status].label}
                        </Badge>
                        <Badge variant="outline" className={
                          application.priority === 'high' ? 'border-red-300 text-red-700' :
                          application.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                          'border-green-300 text-green-700'
                        }>
                          {application.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{application.course}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Deadline: {application.deadline || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>{application.documents.length} documents</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>District: {application.district}</span>
                        </div>
                      </div>

                      {application.notes && (
                        <p className="text-sm text-gray-700 mt-3 bg-gray-50 p-3 rounded">
                          {application.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setEditingApplication(application)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <ApplicationForm
                            application={editingApplication}
                            onSubmit={handleUpdateApplication}
                            onCancel={() => setEditingApplication(null)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteApplication(application.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredApplications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No applications found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
              ? 'Try adjusting your search criteria'
              : 'Start by adding your first application'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Application
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Application Form Component
function ApplicationForm({
  application,
  onSubmit,
  onCancel
}: {
  application?: Application | null;
  onSubmit: (app: any) => void;
  onCancel?: () => void;
}) {
  const [formData, setFormData] = useState({
    collegeName: application?.collegeName || '',
    course: application?.course || '',
    applicationType: application?.applicationType || 'college',
    status: application?.status || 'draft',
    deadline: application?.deadline || '',
    notes: application?.notes || '',
    priority: application?.priority || 'medium',
    district: application?.district || '',
    documents: application?.documents || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>
          {application ? 'Edit Application' : 'Add New Application'}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            College/Institution Name
          </label>
          <Input
            value={formData.collegeName}
            onChange={(e) => setFormData({...formData, collegeName: e.target.value})}
            placeholder="Enter college or scholarship name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course/Program
          </label>
          <Input
            value={formData.course}
            onChange={(e) => setFormData({...formData, course: e.target.value})}
            placeholder="Enter course or program name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Type
          </label>
          <Select value={formData.applicationType} onValueChange={(value: string) => setFormData({...formData, applicationType: value as 'college' | 'scholarship'})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="college">College Application</SelectItem>
              <SelectItem value="scholarship">Scholarship Application</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <Select value={formData.district} onValueChange={(value: string) => setFormData({...formData, district: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Srinagar">Srinagar</SelectItem>
              <SelectItem value="Jammu">Jammu</SelectItem>
              <SelectItem value="Baramulla">Baramulla</SelectItem>
              <SelectItem value="Anantnag">Anantnag</SelectItem>
              <SelectItem value="Kupwara">Kupwara</SelectItem>
              <SelectItem value="Udhampur">Udhampur</SelectItem>
              <SelectItem value="Budgam">Budgam</SelectItem>
              <SelectItem value="Pulwama">Pulwama</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select value={formData.status} onValueChange={(value: string) => setFormData({...formData, status: value as Application['status']})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <Select value={formData.priority} onValueChange={(value: string) => setFormData({...formData, priority: value as 'low' | 'medium' | 'high'})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <Input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Add any additional notes or comments..."
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {application ? 'Update Application' : 'Add Application'}
        </Button>
      </div>
    </form>
  );
}

export default ApplicationTracker;
