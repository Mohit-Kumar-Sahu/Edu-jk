import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Phone, 
  Globe, 
  Mail,
  BookOpen,
  Users,
  Award,
  Navigation,
  Heart,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface College {
  id: string;
  'College Name': string;
  District: string;
  'Level (UG/PG/Both)': string;
  // Add other fields as needed based on your data
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
  distance?: number;
}

export function CollegeLocator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedNAAC, setSelectedNAAC] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Replace mock data with data fetched from backend API
  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await fetch('/api/colleges');
        if (!response.ok) {
          throw new Error('Failed to fetch colleges');
        }
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error('Error fetching colleges:', error);
      }
    }
    fetchColleges();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Error getting user location:', error);
      }
    );
  }, []);

  // Haversine formula to calculate distance between two lat/lng points in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Add distance to each college if user location is available
  const collegesWithDistance = userLocation
    ? colleges.map(college => {
        if (college.latitude && college.longitude) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            college.latitude,
            college.longitude
          );
          return { ...college, distance };
        }
        return college;
      })
    : colleges;

  // Sort colleges by distance if available
  const sortedColleges = collegesWithDistance.sort((a, b) => {
    if (a.distance !== undefined && b.distance !== undefined) {
      return a.distance - b.distance;
    }
    return 0;
  });

  const districts = ['all', 'Srinagar', 'Jammu', 'Baramulla', 'Anantnag', 'Kupwara', 'Udhampur', 'Budgam', 'Pulwama', 'Shopian', 'Kulgam', 'Ganderbal', 'Bandipora', 'Kathua', 'Doda', 'Ramban', 'Kishtwar', 'Poonch', 'Rajouri', 'Reasi', 'Samba'];

  const filteredColleges = sortedColleges.filter(college => {
    const matchesSearch = college['College Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.District.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || college.District === selectedDistrict;
    // Note: Stream and NAAC filters may need adjustment based on actual data
    const matchesStream = selectedStream === 'all' || college['Level (UG/PG/Both)'].includes(selectedStream);
    const matchesNAAC = selectedNAAC === 'all'; // Placeholder, as NAAC grade may not be in schema
    
    return matchesSearch && matchesDistrict && matchesStream && matchesNAAC;
  });

  const toggleSaveCollege = (collegeId: string) => {
    setSavedColleges(prev => 
      prev.includes(collegeId) 
        ? prev.filter(id => id !== collegeId)
        : [...prev, collegeId]
    );
  };

  const getNAACColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStreamColor = (stream: string) => {
    const colors = {
      'Science': 'bg-blue-100 text-blue-800',
      'Commerce': 'bg-green-100 text-green-800',
      'Arts': 'bg-purple-100 text-purple-800'
    };
    return colors[stream as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
          J&K Government Colleges
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover 142 government degree colleges across Jammu & Kashmir
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">142</div>
            <div className="text-sm text-gray-600">Total Colleges</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">20</div>
            <div className="text-sm text-gray-600">Districts</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-gray-600">Courses</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">Free</div>
            <div className="text-sm text-gray-600">Application</div>
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
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Find Your Perfect College</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by college name or district..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district === 'all' ? 'All Districts' : district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger>
                  <SelectValue placeholder="Stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedNAAC} onValueChange={setSelectedNAAC}>
                <SelectTrigger>
                  <SelectValue placeholder="NAAC Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A">A Grade</SelectItem>
                  <SelectItem value="B">B Grade</SelectItem>
                  <SelectItem value="C">C Grade</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  Grid View
                </Button>
                <Button 
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  onClick={() => setViewMode('map')}
                  className="flex-1"
                >
                  Map View
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Found {filteredColleges.length} colleges</span>
              <span>{savedColleges.length} saved colleges</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Toggle */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'map')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          {/* College Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{college['College Name']}</CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{college.District}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveCollege(college.id)}
                        className={`p-2 rounded-full transition-colors ${
                          savedColleges.includes(college.id)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${savedColleges.includes(college.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className={getNAACColor(college.naacGrade || 'Not Available')}>
                        NAAC {college.naacGrade || 'Not Available'}
                      </Badge>
                      <Badge variant="outline">{college.affiliation || 'Government'}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Streams */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Streams Available:</p>
                      <div className="flex flex-wrap gap-1">
                        {(college.streams || []).map((stream: string) => (
                          <Badge key={stream} className={getStreamColor(stream)} variant="secondary">
                            {stream}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{college.totalSeats || 'N/A'} seats</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-green-500" />
                        <span>{college.facultyCount || 'N/A'} faculty</span>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Facilities:</p>
                      <div className="flex flex-wrap gap-1">
                        {(college.facilities || []).slice(0, 3).map((facility: string) => (
                          <Badge key={facility} variant="outline" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {(college.facilities || []).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(college.facilities || []).length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-2">
                        {college.website && (
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                            <Globe className="w-4 h-4" />
                          </button>
                        )}
                        {college.email && (
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                        {college.phone && (
                          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-full">
                            <Phone className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Map</h3>
                  <p className="text-gray-500 mb-4">
                    Map view will show all {filteredColleges.length} colleges with their exact locations
                  </p>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* No Results */}
      {filteredColleges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No colleges found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedDistrict('all');
              setSelectedStream('all');
              setSelectedNAAC('all');
            }}
          >
            Clear Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}
