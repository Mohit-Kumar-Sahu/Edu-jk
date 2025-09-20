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
import { MapView } from '../../components/MapView';// Make sure the path to MapView is correct

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

// Helper function to create a college object with placeholder data
const createCollege = (id: string, name: string, lat: number, lng: number, district: string): College => ({
  id,
  'College Name': name,
  latitude: lat,
  longitude: lng,
  District: district,
  'Level (UG/PG/Both)': 'UG', // Placeholder
  streams: ['Arts', 'Science', 'Commerce'], // Placeholder
  facilities: ['Library', 'Sports Complex'], // Placeholder
  naacGrade: 'A', // Placeholder
  affiliation: 'Govt. Affiliated', // Placeholder
  totalSeats: 800, // Placeholder
  facultyCount: 75, // Placeholder
});

// Cleaned and merged college data you provided
const mockColleges: College[] = [
    // Original rich data
    { id: '1', 'College Name': 'Govt. College for Women, M.A. Road', District: 'Srinagar', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A+', affiliation: 'Cluster University Srinagar', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1200, facultyCount: 150, facilities: ['Library', 'Hostel', 'Auditorium', 'Lab'], website: 'https://gcwmaroad.ac.in/', email: 'info@gcwmaroad.ac.in', phone: '+91-1234567890', latitude: 34.0886, longitude: 74.8080 },
    { id: '2', 'College Name': 'Govt. Degree College, Bemina', District: 'Srinagar', 'Level (UG/PG/Both)': 'UG', naacGrade: 'A', affiliation: 'Cluster University Srinagar', streams: ['Science', 'Commerce'], totalSeats: 1000, facultyCount: 120, facilities: ['Sports', 'Hostel', 'Canteen'], website: 'https://gdcbemina.edu.in/', email: 'info@gdcbemina.edu.in', phone: '+91-9876543210', latitude: 34.0845, longitude: 74.7677 },
    { id: '3', 'College Name': 'Govt. Gandhi Memorial Science College', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A++', affiliation: 'University of Jammu', streams: ['Science'], totalSeats: 2000, facultyCount: 200, facilities: ['Library', 'Auditorium', 'Lab', 'Gym'], website: 'https://ggmsc.in/', email: 'contact@ggmsc.in', phone: '+91-1234512345', latitude: 32.7266, longitude: 74.8570 },
    { id: '4', 'College Name': 'Govt. Degree College, Baramulla', District: 'Baramulla', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 800, facultyCount: 90, facilities: ['Library', 'Sports', 'Hostel'], website: 'https://gdcbaramulla.in/', email: 'info@gdcbaramulla.in', phone: '+91-9988776655', latitude: 34.197, longitude: 74.363 },
    { id: '5', 'College Name': 'Govt. Degree College, Anantnag', District: 'Anantnag', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1500, facultyCount: 160, facilities: ['Library', 'Hostel', 'Auditorium'], website: 'https://gdcanantnag.edu.in/', email: 'contact@gdcanantnag.edu.in', phone: '+91-1932222345', latitude: 33.729, longitude: 75.149 },
    // Data from your new list (cleaned and formatted)
    createCollege('101', 'GDC Sopore', 34.300, 74.470, 'Baramulla'),
    createCollege('102', 'GDC Bijbehara', 33.7925, 75.1070, 'Anantnag'),
    createCollege('103', 'Govt. Degree College Kilhotran', 33.16395, 76.25338, 'Doda'),
    createCollege('104', 'Govt. Degree College Thathri', 33.14528, 75.79111, 'Doda'),
    createCollege('105', 'Govt. Degree College Bhaderwah', 32.983025, 75.710983, 'Doda'),
    createCollege('106', 'Govt. Degree College Doda', 33.1492, 75.5475, 'Doda'),
    createCollege('107', 'Govt. Degree College Kastigarh', 33.146479, 75.548858, 'Doda'),
    createCollege('108', 'GCW Gandhi Nagar Jammu', 32.7104, 74.85797, 'Jammu'),
    createCollege('109', 'Govt. College for Women Bhagwati Nagar Jammu', 32.728726, 74.836823, 'Jammu'),
    createCollege('110', 'Govt. College of Education Jammu', 32.730092, 74.84651, 'Jammu'),
    createCollege('111', 'Govt. College of Engineering & Technology Jammu', 32.730092, 74.84651, 'Jammu'),
    createCollege('112', 'Govt. Degree College Bishnah', 32.6108, 74.8595, 'Jammu'),
    createCollege('113', 'Govt. Degree College Paloura', 32.7420, 74.8580, 'Jammu'),
    createCollege('114', 'Govt. Degree College Akhnoor', 32.9980, 75.5070, 'Jammu'),
    createCollege('115', 'Govt. Degree College R.S Pura', 32.6400, 74.8500, 'Jammu'),
    createCollege('116', 'Govt. Maulana Azad Memorial College, Jammu', 32.7300, 74.8600, 'Jammu'),
    createCollege('117', 'Govt. SPMR College of Commerce', 32.7300, 74.8600, 'Jammu'),
    createCollege('118', 'Govt. Women College, Parade Jammu', 32.7300, 74.8600, 'Jammu'),
    createCollege('119', 'Govt. Degree College for Women Kathua', 32.6000, 75.5000, 'Kathua'),
    createCollege('120', 'Govt. Degree College Hiranagar', 32.5500, 75.6000, 'Kathua'),
    createCollege('121', 'Govt. Degree College Kathua', 32.3855, 75.5226, 'Kathua'),
    createCollege('122', 'Govt. Degree College Kishtwar', 33.0500, 75.7000, 'Kishtwar'),
    createCollege('123', 'Govt. Degree College Surankote', 33.6000, 74.5800, 'Poonch'),
    createCollege('124', 'Shri Krishan Chander Govt. Degree College Poonch', 33.7646, 74.0945, 'Poonch'),
    createCollege('125', 'Govt. Degree College Thanamandi', 33.5630, 74.4270, 'Rajouri'),
    createCollege('126', 'Govt. Degree College Rajouri', 33.3760, 74.3050, 'Rajouri'),
    createCollege('127', 'Govt. Degree College Banihal', 33.8270, 75.2200, 'Ramban'),
    createCollege('128', 'Govt. Degree College Ramban', 33.3180, 75.0460, 'Ramban'),
    createCollege('129', 'Govt. Degree College Reasi', 33.0560, 75.4720, 'Reasi'),
    createCollege('130', 'Govt. Degree College Samba', 32.5020, 75.1160, 'Samba'),
    createCollege('131', 'Govt. Degree College Boys Udhampur', 32.9269, 75.1255, 'Udhampur'),
    createCollege('132', 'Govt. Women College, Udhampur', 32.9260, 75.1370, 'Udhampur'),
    createCollege('133', 'Government Degree College Bandipora', 34.4190, 74.6510, 'Bandipora'),
    createCollege('134', 'Government Degree College Budgam', 34.0279, 74.6543, 'Budgam'),
    createCollege('135', 'Government Degree College Ganderbal', 34.2333, 74.7833, 'Ganderbal'),
    createCollege('136', 'Government Degree College Kulgam', 33.6425, 75.0208, 'Kulgam'),
    createCollege('137', 'Government Degree College Kupwara (Boys)', 34.5262, 74.2572, 'Kupwara'),
    createCollege('138', 'Government Degree College Pulwama', 33.8741, 74.9197, 'Pulwama'),
    createCollege('139', 'Government Degree College Shopian', 33.7146, 74.8319, 'Shopian'),
    createCollege('140', 'Amar Singh College Srinagar', 34.0728, 74.8052, 'Srinagar'),
    createCollege('141', 'Islamia College of Science and Commerce Srinagar', 34.1030, 74.8015, 'Srinagar'),
    createCollege('142', 'Sri Pratap College Srinagar', 34.0833, 74.7933, 'Srinagar'),
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

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const collegesWithDistance = userLocation
    ? colleges.map(college => {
        if (college.latitude && college.longitude) {
          const distance = calculateDistance(userLocation.latitude, userLocation.longitude, college.latitude, college.longitude);
          return { ...college, distance };
        }
        return college;
      })
    : colleges;

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

  const getNAACColor = (grade?: string) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStreamColor = (stream: string) => {
    const colors: { [key: string]: string } = {
      'Science': 'bg-blue-100 text-blue-800',
      'Commerce': 'bg-green-100 text-green-800',
      'Arts': 'bg-purple-100 text-purple-800'
    };
    return colors[stream] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">J&K College Finder</h1>
        <p className="text-lg text-gray-600">Discover Government Degree Colleges Across Jammu & Kashmir</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-700" />
              <span>Find Your Perfect College</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by college name or district..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger><SelectValue placeholder="District" /></SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>{district === 'all' ? 'All Districts' : district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger><SelectValue placeholder="Stream" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedNAAC} onValueChange={setSelectedNAAC}>
                <SelectTrigger><SelectValue placeholder="NAAC Grade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A++">A++ Grade</SelectItem>
                  <SelectItem value="A+">A+ Grade</SelectItem>
                  <SelectItem value="A">A Grade</SelectItem>
                  <SelectItem value="B++">B++ Grade</SelectItem>
                  <SelectItem value="B+">B+ Grade</SelectItem>
                  <SelectItem value="B">B Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'map')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Showing {filteredColleges.length} of {colleges.length} colleges</span>
              <span className="flex items-center"><Heart className="w-4 h-4 mr-1 text-red-500"/> {savedColleges.length} saved</span>
          </div>
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredColleges.map((college, index) => (
              <motion.div
                layout
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-2">
                        <CardTitle className="text-lg mb-1">{college['College Name']}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{college.District}</span>
                          {college.distance && (
                            <>
                              <span>•</span>
                              <span>{college.distance.toFixed(1)} km away</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => toggleSaveCollege(college.id)}>
                        <Heart className={`w-5 h-5 transition-colors ${savedColleges.includes(college.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            <Badge className={getNAACColor(college.naacGrade)}>NAAC {college.naacGrade || 'N/A'}</Badge>
                            <Badge variant="outline">{college.affiliation}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {(college.streams || []).map((stream) => (
                                <Badge key={stream} className={getStreamColor(stream)} variant="secondary">{stream}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {college.website && <Button asChild variant="outline" size="icon" className="h-8 w-8"><a href={college.website} target="_blank" rel="noopener noreferrer"><Globe className="w-4 h-4" /></a></Button>}
                          {college.email && <Button asChild variant="outline" size="icon" className="h-8 w-8"><a href={`mailto:${college.email}`}><Mail className="w-4 h-4" /></a></Button>}
                          {college.phone && <Button asChild variant="outline" size="icon" className="h-8 w-8"><a href={`tel:${college.phone}`}><Phone className="w-4 h-4" /></a></Button>}
                        </div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="map">
          <MapView colleges={filteredColleges} userLocation={userLocation} />
        </TabsContent>
      </Tabs>

      {filteredColleges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Colleges Found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedDistrict('all');
              setSelectedStream('all');
              setSelectedNAAC('all');
            }}
          >
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </div>
  );
}