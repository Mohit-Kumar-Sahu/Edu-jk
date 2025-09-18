"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

// Hardcoded mock data with 10 colleges
const mockColleges: College[] = [
  {
    id: '1',
    'College Name': 'Govt. College for Women, M.A. Road',
    District: 'Srinagar',
    'Level (UG/PG/Both)': 'Both',
    naacGrade: 'A+',
    affiliation: 'Cluster University Srinagar',
    streams: ['Arts', 'Science', 'Commerce'],
    totalSeats: 1200,
    facultyCount: 150,
    facilities: ['Library', 'Hostel', 'Auditorium', 'Lab'],
    website: 'https://gcwmaroad.ac.in/',
    email: 'info@gcwmaroad.ac.in',
    phone: '+91-1234567890',
    latitude: 34.0886,
    longitude: 74.8080,
  },
  {
    id: '2',
    'College Name': 'Govt. Degree College, Bemina',
    District: 'Srinagar',
    'Level (UG/PG/Both)': 'UG',
    naacGrade: 'A',
    affiliation: 'Cluster University Srinagar',
    streams: ['Science', 'Commerce'],
    totalSeats: 1000,
    facultyCount: 120,
    facilities: ['Sports', 'Hostel', 'Canteen'],
    website: 'https://gdcbemina.edu.in/',
    email: 'info@gdcbemina.edu.in',
    phone: '+91-9876543210',
    latitude: 34.0845,
    longitude: 74.7677,
  },
  {
    id: '3',
    'College Name': 'Govt. Gandhi Memorial Science College',
    District: 'Jammu',
    'Level (UG/PG/Both)': 'Both',
    naacGrade: 'A++',
    affiliation: 'University of Jammu',
    streams: ['Science'],
    totalSeats: 2000,
    facultyCount: 200,
    facilities: ['Library', 'Auditorium', 'Lab', 'Gym'],
    website: 'https://ggmsc.in/',
    email: 'contact@ggmsc.in',
    phone: '+91-1234512345',
    latitude: 32.7266,
    longitude: 74.8570,
  },
  {
    id: '4',
    'College Name': 'Govt. Degree College, Baramulla',
    District: 'Baramulla',
    'Level (UG/PG/Both)': 'UG',
    naacGrade: 'B+',
    affiliation: 'University of Kashmir',
    streams: ['Arts', 'Science', 'Commerce'],
    totalSeats: 800,
    facultyCount: 90,
    facilities: ['Library', 'Sports', 'Hostel'],
    website: 'https://gdcbaramulla.in/',
    email: 'info@gdcbaramulla.in',
    phone: '+91-9988776655',
    latitude: 34.2045,
    longitude: 74.3644,
  },
  {
    id: '5',
    'College Name': 'Govt. Degree College, Anantnag',
    District: 'Anantnag',
    'Level (UG/PG/Both)': 'Both',
    naacGrade: 'A',
    affiliation: 'University of Kashmir',
    streams: ['Arts', 'Science', 'Commerce'],
    totalSeats: 1500,
    facultyCount: 160,
    facilities: ['Library', 'Hostel', 'Auditorium'],
    website: 'https://gdcanantnag.edu.in/',
    email: 'contact@gdcanantnag.edu.in',
    phone: '+91-1932222345',
    latitude: 33.7317,
    longitude: 75.1437,
  },
  {
    id: '6',
    'College Name': 'Govt. Degree College, Udhampur',
    District: 'Udhampur',
    'Level (UG/PG/Both)': 'UG',
    naacGrade: 'B++',
    affiliation: 'University of Jammu',
    streams: ['Science', 'Commerce'],
    totalSeats: 900,
    facultyCount: 100,
    facilities: ['Sports', 'Lab', 'Canteen'],
    website: 'https://gdcudhampur.ac.in/',
    email: 'info@gdcudhampur.ac.in',
    phone: '+91-1992270725',
    latitude: 32.9248,
    longitude: 75.1472,
  },
  {
    id: '7',
    'College Name': 'Govt. Degree College, Kathua',
    District: 'Kathua',
    'Level (UG/PG/Both)': 'UG',
    naacGrade: 'A',
    affiliation: 'University of Jammu',
    streams: ['Arts', 'Commerce'],
    totalSeats: 1100,
    facultyCount: 115,
    facilities: ['Library', 'Canteen'],
    website: 'https://gdckathua.edu.in/',
    email: 'chauhanvikrant133@gmail.com',
    phone: '+916261274005',
    latitude: 32.3855,
    longitude: 75.5226,
  },
  {
    id: '8',
    'College Name': 'Govt. Degree College, Poonch',
    District: 'Poonch',
    'Level (UG/PG/Both)': 'UG',
    naacGrade: 'B+',
    affiliation: 'University of Jammu',
    streams: ['Arts', 'Science'],
    totalSeats: 700,
    facultyCount: 80,
    facilities: ['Sports', 'Hostel'],
    website: 'https://gdcpoonch.in/',
    email: 'info@gdcpoonch.in',
    phone: '+91-1965220677',
    latitude: 33.7663,
    longitude: 74.0934,
  },
  {
    id: '9',
    'College Name': 'Govt. Degree College, Budgam',
    District: 'Budgam',
    'Level (UG/PG/Both)': 'UG',
    naacGrade: 'B',
    affiliation: 'University of Kashmir',
    streams: ['Arts', 'Science'],
    totalSeats: 950,
    facultyCount: 110,
    facilities: ['Library', 'Auditorium'],
    website: 'https://gdcbudgam.edu.in/',
    email: 'info@gdcbudgam.edu.in',
    phone: '+91-1951255432',
    latitude: 34.0279,
    longitude: 74.6543,
  },
  {
    id: '10',
    'College Name': 'Govt. College of Education, Jammu',
    District: 'Jammu',
    'Level (UG/PG/Both)': 'PG',
    naacGrade: 'A',
    affiliation: 'University of Jammu',
    streams: ['Education'],
    totalSeats: 500,
    facultyCount: 60,
    facilities: ['Library', 'Auditorium'],
    website: 'https://gcejammu.ac.in/',
    email: 'gcejammu@gmail.com',
    phone: '+91-1912582877',
    latitude: 32.7266,
    longitude: 74.8570,
  },
];


export function CollegeLocator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedNAAC, setSelectedNAAC] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    // In a real app, you would fetch data here.
    // For this example, we use the mock data directly.
    setColleges(mockColleges);

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
    const matchesStream = selectedStream === 'all' || college.streams?.includes(selectedStream);
    const matchesNAAC = selectedNAAC === 'all' || college.naacGrade === selectedNAAC;
    
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
                  <SelectItem value="A+">A+ Grade</SelectItem>
                  <SelectItem value="A">A Grade</SelectItem>
                  <SelectItem value="B+">B+ Grade</SelectItem>
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
                          <a href={college.website} target="_blank" rel="noopener noreferrer" className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                        {college.email && (
                          <a href={`mailto:${college.email}`} className="p-2 text-green-600 hover:bg-green-50 rounded-full">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {college.phone && (
                          <a href={`tel:${college.phone}`} className="p-2 text-orange-600 hover:bg-orange-50 rounded-full">
                            <Phone className="w-4 h-4" />
                          </a>
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