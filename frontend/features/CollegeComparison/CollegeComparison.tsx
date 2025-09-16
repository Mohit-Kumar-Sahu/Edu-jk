import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Plus,
  X,
  Star,
  Award,
  MapPin,
  Users,
  BookOpen,
  Trophy,
  Save,
  Download,
  Share2,
  BarChart3,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

interface College {
  _id: string;
  'College Name': string;
  District: string;
  'Level (UG/PG/Both)': string;
  naacGrade?: string;
  affiliation?: string;
  streams?: string[];
  totalSeats?: number;
  facultyCount?: number;
  facilities?: string[];
  website?: string;
  email?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  comparisonMetrics?: {
    studentFacultyRatio: string;
    facilitiesScore: number;
    accreditationScore: number;
    locationScore: number;
    courseDiversity: number;
    totalScore: number;
  };
}

interface Comparison {
  id: string;
  name: string;
  collegeIds: string[];
  criteria: string[];
  createdAt: string;
}

export function CollegeComparison() {
  const { user } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedComparisons, setSavedComparisons] = useState<Comparison[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [comparisonName, setComparisonName] = useState('');
  const [activeTab, setActiveTab] = useState('compare');

  useEffect(() => {
    fetchColleges();
    if (user) {
      fetchSavedComparisons();
    }
  }, [user]);

  const fetchColleges = async () => {
    try {
      const response = await fetch('/api/colleges');
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const fetchSavedComparisons = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/comparisons/user/${user.id}`);
      const data = await response.json();
      setSavedComparisons(data);
    } catch (error) {
      console.error('Error fetching saved comparisons:', error);
    }
  };

  const addCollegeToComparison = (college: College) => {
    if (selectedColleges.length >= 4) {
      alert('You can compare up to 4 colleges at once');
      return;
    }
    if (!selectedColleges.find(c => c._id === college._id)) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const removeCollegeFromComparison = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter(c => c._id !== collegeId));
  };

  const compareColleges = async () => {
    if (selectedColleges.length < 2) {
      alert('Please select at least 2 colleges to compare');
      return;
    }

    setLoading(true);
    try {
      const ids = selectedColleges.map(c => c._id).join(',');
      const response = await fetch(`/api/colleges/compare?ids=${ids}`);
      const data = await response.json();
      setSelectedColleges(data);
    } catch (error) {
      console.error('Error comparing colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveComparison = async () => {
    if (!user || !comparisonName.trim()) return;

    try {
      const response = await fetch('/api/comparisons/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: comparisonName,
          collegeIds: selectedColleges.map(c => c._id),
          criteria: ['accreditation', 'facilities', 'location', 'courses']
        })
      });

      if (response.ok) {
        setShowSaveDialog(false);
        setComparisonName('');
        fetchSavedComparisons();
      }
    } catch (error) {
      console.error('Error saving comparison:', error);
    }
  };

  const loadComparison = (comparison: Comparison) => {
    // Load colleges for the comparison
    const comparisonColleges = colleges.filter(c => comparison.collegeIds.includes(c._id));
    setSelectedColleges(comparisonColleges);
    setActiveTab('compare');
  };

  const filteredColleges = colleges.filter(college =>
    college['College Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.District.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
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
          College Comparison Tool
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Compare up to 4 colleges side-by-side to make informed decisions
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="select">Select Colleges</TabsTrigger>
          <TabsTrigger value="compare">Compare</TabsTrigger>
          <TabsTrigger value="saved">Saved Comparisons</TabsTrigger>
        </TabsList>

        <TabsContent value="select" className="space-y-6">
          {/* College Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Select Colleges to Compare</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search colleges by name or district..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredColleges.map((college) => (
                  <motion.div
                    key={college._id}
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{college['College Name']}</h3>
                      <Button
                        size="sm"
                        variant={selectedColleges.find(c => c._id === college._id) ? "secondary" : "outline"}
                        onClick={() => addCollegeToComparison(college)}
                        disabled={selectedColleges.length >= 4}
                      >
                        {selectedColleges.find(c => c._id === college._id) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{college.District}</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">
                        {college['Level (UG/PG/Both)']}
                      </Badge>
                      {college.naacGrade && (
                        <Badge variant="outline" className="text-xs">
                          NAAC {college.naacGrade}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Colleges Summary */}
          {selectedColleges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Colleges ({selectedColleges.length}/4)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedColleges.map((college) => (
                    <Badge key={college._id} variant="secondary" className="flex items-center space-x-1">
                      <span>{college['College Name']}</span>
                      <button
                        onClick={() => removeCollegeFromComparison(college._id)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button onClick={compareColleges} disabled={selectedColleges.length < 2}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Compare Colleges
                  </Button>
                  {user && (
                    <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Save className="w-4 h-4 mr-2" />
                          Save Comparison
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Save Comparison</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter comparison name..."
                            value={comparisonName}
                            onChange={(e) => setComparisonName(e.target.value)}
                          />
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={saveComparison}>Save</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          {selectedColleges.length < 2 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Select colleges to compare
                </h3>
                <p className="text-gray-500">
                  Go to the "Select Colleges" tab to choose colleges for comparison
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Comparison Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>College Comparison</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedColleges.map((college, index) => (
                  <motion.div
                    key={college._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{college['College Name']}</CardTitle>
                          <button
                            onClick={() => removeCollegeFromComparison(college._id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{college.District}</span>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Overall Score */}
                        {college.comparisonMetrics && (
                          <div className={`p-3 rounded-lg ${getScoreBgColor(college.comparisonMetrics.totalScore)}`}>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">Overall Score</span>
                              <span className={`font-bold text-lg ${getScoreColor(college.comparisonMetrics.totalScore)}`}>
                                {college.comparisonMetrics.totalScore}/100
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Key Metrics */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">NAAC Grade</span>
                            <Badge variant="outline">
                              {college.naacGrade || 'N/A'}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Student-Faculty Ratio</span>
                            <span className="font-semibold">
                              {college.comparisonMetrics?.studentFacultyRatio || 'N/A'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Courses</span>
                            <span className="font-semibold">
                              {college.streams?.length || 0}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm">Facilities</span>
                            <span className="font-semibold">
                              {college.facilities?.length || 0}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 border-t space-y-2">
                          <Button className="w-full" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" className="w-full" size="sm">
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Metric</th>
                          {selectedColleges.map((college) => (
                            <th key={college._id} className="text-center p-2 min-w-32">
                              {college['College Name']}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Overall Score</td>
                          {selectedColleges.map((college) => (
                            <td key={college._id} className="text-center p-2">
                              <span className={`font-bold ${getScoreColor(college.comparisonMetrics?.totalScore || 0)}`}>
                                {college.comparisonMetrics?.totalScore || 'N/A'}/100
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">NAAC Grade</td>
                          {selectedColleges.map((college) => (
                            <td key={college._id} className="text-center p-2">
                              {college.naacGrade || 'N/A'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Student-Faculty Ratio</td>
                          {selectedColleges.map((college) => (
                            <td key={college._id} className="text-center p-2">
                              {college.comparisonMetrics?.studentFacultyRatio || 'N/A'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Total Seats</td>
                          {selectedColleges.map((college) => (
                            <td key={college._id} className="text-center p-2">
                              {college.totalSeats || 'N/A'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Course Diversity</td>
                          {selectedColleges.map((college) => (
                            <td key={college._id} className="text-center p-2">
                              {college.streams?.length || 0}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-medium">Facilities Count</td>
                          {selectedColleges.map((college) => (
                            <td key={college._id} className="text-center p-2">
                              {college.facilities?.length || 0}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {!user ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Sign in to save comparisons
                </h3>
                <p className="text-gray-500">
                  Create an account to save and manage your college comparisons
                </p>
              </CardContent>
            </Card>
          ) : savedComparisons.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Save className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No saved comparisons
                </h3>
                <p className="text-gray-500">
                  Create and save college comparisons to access them later
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedComparisons.map((comparison) => (
                <Card key={comparison.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{comparison.name}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {comparison.collegeIds.length} colleges • {new Date(comparison.createdAt).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => loadComparison(comparison)}
                      className="w-full"
                    >
                      Load Comparison
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
