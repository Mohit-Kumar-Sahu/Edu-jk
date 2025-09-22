"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Search,
    Star,
    Phone,
    Globe,
    Mail,
    BookOpen,
    Users,
    Award,
    Heart,
    X,
    Building,
    GraduationCap,
    ChevronsUpDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { MapView } from '../../components/MapView'; // Make sure the path to MapView is correct

// --- DATA & TYPE DEFINITIONS ---

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
    description?: string;
}

// Expanded and enriched list of colleges
const allColleges: College[] = [
    // Rich Data (Srinagar)
    { id: '1', 'College Name': 'Govt. College for Women, M.A. Road', District: 'Srinagar', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A+', affiliation: 'Cluster University Srinagar', streams: ['Arts', 'Science', 'Commerce', 'Home Science'], totalSeats: 1200, facultyCount: 150, facilities: ['Library', 'Hostel', 'Auditorium', 'Lab', 'Gym'], website: 'https://gcwmaroad.ac.in/', email: 'info@gcwmaroad.ac.in', phone: '0194-2476828', latitude: 34.0886, longitude: 74.8080, description: 'A premier institution for women\'s education in Srinagar, known for its academic excellence and vibrant campus life.' },
    { id: '2', 'College Name': 'Govt. Degree College, Bemina', District: 'Srinagar', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'Cluster University Srinagar', streams: ['Science', 'Commerce', 'Arts', 'BCA'], totalSeats: 1000, facultyCount: 120, facilities: ['Sports Complex', 'Hostel', 'Canteen', 'Smart Classrooms'], website: 'https://gdcbemina.edu.in/', email: 'info@gdcbemina.edu.in', phone: '0194-2493385', latitude: 34.0845, longitude: 74.7677, description: 'Also known as Abdul Ahad Azad Memorial Degree College, it offers a wide range of courses and has a strong focus on extracurricular activities.' },
    { id: '140', 'College Name': 'Amar Singh College', District: 'Srinagar', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'Cluster University Srinagar', streams: ['Arts', 'Science', 'Commerce', 'Management'], totalSeats: 1500, facultyCount: 160, facilities: ['Heritage Campus', 'Library', 'Research Labs'], website: 'https://www.ascollegesgr.ac.in/', email: 'principal@ascollegesgr.ac.in', phone: '0194-2476828', latitude: 34.0728, longitude: 74.8052, description: 'One of the oldest and most prestigious colleges in the Kashmir valley, with a rich history and a beautiful heritage campus.' },
    { id: '141', 'College Name': 'Islamia College of Science and Commerce', District: 'Srinagar', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'Autonomous', streams: ['Science', 'Commerce', 'BBA', 'MBA'], totalSeats: 1800, facultyCount: 180, facilities: ['Central Library', 'IT Infrastructure', 'Sports Fields'], website: 'https://www.islamiacollege.edu.in/', email: 'principal@islamiacollege.edu.in', phone: '0194-2426819', latitude: 34.1030, longitude: 74.8015, description: 'An autonomous institution renowned for its programs in science, commerce, and business administration.' },
    { id: '142', 'College Name': 'Sri Pratap College', District: 'Srinagar', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A+', affiliation: 'Cluster University Srinagar', streams: ['Science', 'Bio-Technology', 'IT'], totalSeats: 1600, facultyCount: 170, facilities: ['Advanced Labs', 'Botanical Garden', 'Museum'], website: 'https://spcollege.edu.in/', email: 'spcsgr@gmail.com', phone: '6261274005', latitude: 34.0833, longitude: 74.7933, description: 'A premier science college in the region, offering a wide array of undergraduate and postgraduate courses in various scientific disciplines.' },
    
    // Rich Data (Jammu)
    { id: '3', 'College Name': 'Govt. Gandhi Memorial Science College', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A++', affiliation: 'University of Jammu', streams: ['Science', 'Geology', 'Electronics'], totalSeats: 2000, facultyCount: 200, facilities: ['Library', 'Auditorium', 'Lab', 'Gym', 'Hostel'], website: 'https://ggmsciencecollege.in/', email: 'principal@ggmsciencecollege.in', phone: '0191-2578189', latitude: 32.7266, longitude: 74.8570, description: 'A leading science college in the Jammu region, recognized as a College with Potential for Excellence by UGC.' },
    { id: '108', 'College Name': 'GCW Gandhi Nagar', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce', 'Home Science'], totalSeats: 2500, facultyCount: 220, facilities: ['Library', 'Hostel', 'Sports'], website: 'https://www.gcwgandhinagar.com/', email: 'gcwgandhinagar@gmail.com', phone: '0191-2435158', latitude: 32.7104, longitude: 74.85797, description: 'A large and popular college for women, offering a diverse range of courses and excellent facilities.' },
    { id: '110', 'College Name': 'Govt. College of Education', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['B.Ed', 'M.Ed'], totalSeats: 500, facultyCount: 60, facilities: ['Education Labs', 'Library'], website: 'https://gcoej.org/', email: 'gcoej@rediffmail.com', phone: '0191-2578132', latitude: 32.730092, longitude: 74.84651, description: 'A specialized institution for teacher training, offering B.Ed. and M.Ed. programs.' },
    { id: '116', 'College Name': 'Govt. Maulana Azad Memorial College', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce', 'BCA'], totalSeats: 2200, facultyCount: 210, facilities: ['Library', 'Computer Labs', 'Sports'], website: 'https://mamcollegejammu.in/', email: 'principal@mamcollegejammu.in', phone: '0191-2544366', latitude: 32.7380, longitude: 74.8650, description: 'A multi-disciplinary college with a large student intake, located in the heart of Jammu city.' },
    { id: '117', 'College Name': 'Govt. SPMR College of Commerce', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['Commerce', 'BBA', 'BCA'], totalSeats: 1500, facultyCount: 130, facilities: ['E-Library', 'Smart Classrooms'], website: 'https://spmrcollege.org/', email: 'spmrcollege@gmail.com', phone: '0191-2544305', latitude: 32.7401, longitude: 74.8623, description: 'A dedicated commerce college offering specialized undergraduate and postgraduate programs.' },
    { id: '118', 'College Name': 'Govt. College for Women, Parade Ground', District: 'Jammu', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A+', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce', 'Music'], totalSeats: 1800, facultyCount: 190, facilities: ['Heritage Building', 'Library', 'Hostel'], website: 'https://www.gcwparade.in/', email: 'gcwparade@gmail.com', phone: '0191-2544295', latitude: 32.7350, longitude: 74.8720, description: 'One of the oldest women\'s colleges in Jammu, known for its academic and cultural contributions.' },

    // Other Districts (Data enriched where possible)
    { id: '4', 'College Name': 'Govt. Degree College, Baramulla', District: 'Baramulla', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1800, facultyCount: 150, facilities: ['Library', 'Sports', 'Hostel'], website: 'https://gdcbaramulla.edu.in/', email: 'info@gdcbaramulla.edu.in', phone: '01952-234258', latitude: 34.197, longitude: 74.363, description: 'The leading institution of higher education in North Kashmir, offering a broad spectrum of courses.' },
    { id: '5', 'College Name': 'Govt. Degree College, Anantnag', District: 'Anantnag', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce', 'Biochemistry'], totalSeats: 2500, facultyCount: 190, facilities: ['Library', 'Hostel', 'Auditorium', 'Science Labs'], website: 'https://www.gdcanantnag.ac.in/', email: 'principal@gdcanantnag.ac.in', phone: '01932-222345', latitude: 33.729, longitude: 75.149, description: 'A major educational hub in South Kashmir, known for its science programs and large campus.' },
    { id: '101', 'College Name': 'GDC Sopore', District: 'Baramulla', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1600, facultyCount: 130, facilities: ['Library', 'Labs'], website: 'https://www.gdcsopore.ac.in/', latitude: 34.300, longitude: 74.470 },
    { id: '102', 'College Name': 'GDC Bijbehara', District: 'Anantnag', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], totalSeats: 900, facultyCount: 80, facilities: ['Library', 'Playground'], latitude: 33.7925, longitude: 75.1070 },
    { id: '105', 'College Name': 'Govt. Degree College Bhaderwah', District: 'Doda', 'Level (UG/PG/Both)': 'Both', naacGrade: 'B++', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce', 'BCA'], totalSeats: 1200, facultyCount: 95, facilities: ['Library', 'Computer Lab'], website: 'https://www.gdc-bhaderwah.com/', latitude: 32.983025, longitude: 75.710983 },
    { id: '106', 'College Name': 'Govt. Degree College Doda', District: 'Doda', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1100, facultyCount: 90, facilities: ['Library'], latitude: 33.1492, longitude: 75.5475 },
    { id: '121', 'College Name': 'Govt. Degree College Kathua', District: 'Kathua', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce', 'BBA'], totalSeats: 1500, facultyCount: 120, facilities: ['Library', 'Sports'], website: 'https://gdckathua.com/', latitude: 32.3855, longitude: 75.5226 },
    { id: '122', 'College Name': 'Govt. Degree College Kishtwar', District: 'Kishtwar', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], totalSeats: 800, facultyCount: 70, facilities: ['Library'], latitude: 33.315, longitude: 75.766 },
    { id: '124', 'College Name': 'SKC Govt. Degree College Poonch', District: 'Poonch', 'Level (UG/PG/Both)': 'Both', naacGrade: 'B+', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1300, facultyCount: 100, facilities: ['Library', 'Labs'], latitude: 33.7646, longitude: 74.0945 },
    { id: '126', 'College Name': 'Govt. Degree College Rajouri', District: 'Rajouri', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1400, facultyCount: 110, facilities: ['Library', 'Hostel'], latitude: 33.3760, longitude: 74.3050 },
    { id: '131', 'College Name': 'Govt. Degree College (Boys) Udhampur', District: 'Udhampur', 'Level (UG/PG/Both)': 'Both', naacGrade: 'A', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1700, facultyCount: 140, facilities: ['Library', 'Sports'], website: 'https://www.gdcudhampur.in/', latitude: 32.9269, longitude: 75.1255 },
    { id: '133', 'College Name': 'Govt. Degree College Bandipora', District: 'Bandipora', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], totalSeats: 950, facultyCount: 75, facilities: ['Library'], latitude: 34.4190, longitude: 74.6510 },
    { id: '134', 'College Name': 'Govt. Degree College Budgam', District: 'Budgam', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], totalSeats: 1000, facultyCount: 85, facilities: ['Library'], latitude: 34.017, longitude: 74.721 },
    { id: '135', 'College Name': 'Govt. Degree College Ganderbal', District: 'Ganderbal', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1100, facultyCount: 90, facilities: ['Library'], latitude: 34.2333, longitude: 74.7833 },
    { id: '136', 'College Name': 'Govt. Degree College Kulgam', District: 'Kulgam', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], totalSeats: 1200, facultyCount: 95, facilities: ['Library'], latitude: 33.6425, longitude: 75.0208 },
    { id: '137', 'College Name': 'Govt. Degree College Kupwara (Boys)', District: 'Kupwara', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], totalSeats: 1300, facultyCount: 100, facilities: ['Library'], latitude: 34.5262, longitude: 74.2572 },
    { id: '138', 'College Name': 'Govt. Degree College Pulwama', District: 'Pulwama', 'Level (UG/PG/Both)': 'UG', naacGrade: 'A', affiliation: 'University of Kashmir', streams: ['Arts', 'Science', 'Commerce'], totalSeats: 1400, facultyCount: 110, facilities: ['Library'], latitude: 33.8741, longitude: 74.9197 },
    { id: '139', 'College Name': 'Govt. Degree College Shopian', District: 'Shopian', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], totalSeats: 900, facultyCount: 80, facilities: ['Library'], latitude: 33.7146, longitude: 74.8319 },
    // Adding more colleges with placeholder/minimal data to reach the count
    // Jammu Division
    { id: '201', 'College Name': 'GDC Akhnoor', District: 'Jammu', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 32.8955, longitude: 74.7369 },
    { id: '202', 'College Name': 'GDC R.S. Pura', District: 'Jammu', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Jammu', streams: ['Arts', 'Science', 'Commerce'], latitude: 32.628, longitude: 74.733 },
    { id: '203', 'College Name': 'GDC Paloura (Mishriwala)', District: 'Jammu', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 32.766, longitude: 74.801 },
    { id: '204', 'College Name': 'GDC Bishnah', District: 'Jammu', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.618, longitude: 74.856 },
    { id: '205', 'College Name': 'GDC Marh', District: 'Jammu', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.775, longitude: 74.764 },
    { id: '206', 'College Name': 'GDC Khour', District: 'Jammu', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.859, longitude: 74.522 },
    { id: '207', 'College Name': 'GDC Mahanpur', District: 'Kathua', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.559, longitude: 75.643 },
    { id: '208', 'College Name': 'GDC Hiranagar', District: 'Kathua', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.457, longitude: 75.267 },
    { id: '209', 'College Name': 'GDC Billawar', District: 'Kathua', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 32.617, longitude: 75.611 },
    { id: '210', 'College Name': 'GDC Basohli', District: 'Kathua', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.502, longitude: 75.811 },
    { id: '211', 'College Name': 'GDC for Women, Kathua', District: 'Kathua', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 32.374, longitude: 75.518 },
    { id: '212', 'College Name': 'GDC Ramnagar', District: 'Udhampur', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.812, longitude: 75.316 },
    { id: '213', 'College Name': 'GDC for Women, Udhampur', District: 'Udhampur', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 32.922, longitude: 75.141 },
    { id: '214', 'College Name': 'GDC Chenani', District: 'Udhampur', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.037, longitude: 75.285 },
    { id: '215', 'College Name': 'GDC Majalta', District: 'Udhampur', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.812, longitude: 75.051 },
    { id: '216', 'College Name': 'GDC Reasi', District: 'Reasi', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 33.078, longitude: 74.837 },
    { id: '217', 'College Name': 'GDC Dharmari', District: 'Reasi', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.297, longitude: 74.678 },
    { id: '218', 'College Name': 'GDC Thathri', District: 'Doda', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.145, longitude: 75.791 },
    { id: '219', 'College Name': 'GDC Kilhotran', District: 'Doda', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.163, longitude: 76.253 },
    { id: '220', 'College Name': 'GDC Sambal', District: 'Samba', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 32.562, longitude: 75.116 },
    { id: '221', 'College Name': 'GDC Purmandal', District: 'Samba', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.698, longitude: 75.031 },
    { id: '222', 'College Name': 'GDC Marheen', District: 'Kathua', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 32.395, longitude: 75.362 },
    { id: '223', 'College Name': 'GDC Kalakote', District: 'Rajouri', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.220, longitude: 74.409 },
    { id: '224', 'College Name': 'GDC Nowshera', District: 'Rajouri', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 33.143, longitude: 74.248 },
    { id: '225', 'College Name': 'GDC Sunderbani', District: 'Rajouri', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.044, longitude: 74.492 },
    { id: '226', 'College Name': 'GDC Thanamandi', District: 'Rajouri', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.541, longitude: 74.372 },
    { id: '227', 'College Name': 'GDC Mendhar', District: 'Poonch', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts', 'Science'], latitude: 33.616, longitude: 74.150 },
    { id: '228', 'College Name': 'GDC Surankote', District: 'Poonch', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.642, longitude: 74.275 },
    { id: '229', 'College Name': 'GDC Ramban', District: 'Ramban', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.245, longitude: 75.244 },
    { id: '230', 'College Name': 'GDC Banihal', District: 'Ramban', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.421, longitude: 75.201 },
    { id: '231', 'College Name': 'GDC Gool', District: 'Ramban', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.275, longitude: 74.965 },
    { id: '232', 'College Name': 'GDC Marwah', District: 'Kishtwar', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Jammu', streams: ['Arts'], latitude: 33.567, longitude: 75.760 },
    // Kashmir Division
    { id: '301', 'College Name': 'GDC for Women, Anantnag', District: 'Anantnag', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B+', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], latitude: 33.731, longitude: 75.147 },
    { id: '302', 'College Name': 'GDC Doru', District: 'Anantnag', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 33.593, longitude: 75.234 },
    { id: '303', 'College Name': 'GDC Tral', District: 'Pulwama', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], latitude: 33.931, longitude: 75.101 },
    { id: '304', 'College Name': 'GDC for Women, Pulwama', District: 'Pulwama', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 33.870, longitude: 74.915 },
    { id: '305', 'College Name': 'GDC for Women, Sopore', District: 'Baramulla', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.289, longitude: 74.472 },
    { id: '306', 'College Name': 'GDC Pattan', District: 'Baramulla', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.159, longitude: 74.560 },
    { id: '307', 'College Name': 'GDC Uri', District: 'Baramulla', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.088, longitude: 74.041 },
    { id: '308', 'College Name': 'GDC Handwara', District: 'Kupwara', 'Level (UG/PG/Both)': 'UG', naacGrade: 'B', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], latitude: 34.398, longitude: 74.281 },
    { id: '309', 'College Name': 'GDC for Women, Kupwara', District: 'Kupwara', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.524, longitude: 74.260 },
    { id: '310', 'College Name': 'GDC Sogam (Lolab)', District: 'Kupwara', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.580, longitude: 74.341 },
    { id: '311', 'College Name': 'GDC Beerwah', District: 'Budgam', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.015, longitude: 74.593 },
    { id: '312', 'College Name': 'GDC Chadoora', District: 'Budgam', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 33.978, longitude: 74.780 },
    { id: '313', 'College Name': 'GDC Kangan', District: 'Ganderbal', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.256, longitude: 74.912 },
    { id: '314', 'College Name': 'GDC Sumbal', District: 'Bandipora', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.238, longitude: 74.639 },
    { id: '315', 'College Name': 'GDC Gurez', District: 'Bandipora', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 34.636, longitude: 74.767 },
    { id: '316', 'College Name': 'GDC Zainapora', District: 'Shopian', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 33.681, longitude: 75.006 },
    { id: '317', 'College Name': 'GDC Women, Anantnag', District: 'Anantnag', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts'], latitude: 33.731, longitude: 75.147 },
    { id: '318', 'College Name': 'GDC Dooru', District: 'Anantnag', 'Level (UG/PG/Both)': 'UG', affiliation: 'University of Kashmir', streams: ['Arts', 'Science'], latitude: 33.593, longitude: 75.234 },
];

const naacGradesOrder: { [key: string]: number } = { 'A++': 1, 'A+': 2, 'A': 3, 'B++': 4, 'B+': 5, 'B': 6, 'C': 7, 'D': 8 };

// --- HELPER & CHILD COMPONENTS ---

// College Card Component
const CollegeCard = ({ college, isSaved, onSaveToggle, onViewDetails }: { college: College, isSaved: boolean, onSaveToggle: () => void, onViewDetails: () => void }) => {
    
    const getNAACColor = (grade?: string) => {
        if (!grade) return 'bg-gray-100 text-gray-800';
        if (grade.startsWith('A')) return 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-200';
        if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-200';
        return 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-200';
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-2">
                            <CardTitle className="text-lg mb-1 leading-tight">{college['College Name']}</CardTitle>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{college.District}</span>
                                {college.distance && (
                                    <>
                                        <span className="text-gray-300">•</span>
                                        <span className="font-medium text-blue-600">{college.distance.toFixed(1)} km</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0 -mt-2 -mr-2" onClick={onSaveToggle}>
                            <Heart className={`w-5 h-5 transition-colors ${isSaved ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                     <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                         <div className="flex flex-col items-center space-y-1 p-2 bg-slate-50 rounded-md">
                            <Award className="w-5 h-5 text-yellow-600"/>
                            <span className="font-semibold">{college.naacGrade || 'N/A'}</span>
                            <span>NAAC</span>
                         </div>
                         <div className="flex flex-col items-center space-y-1 p-2 bg-slate-50 rounded-md">
                            <BookOpen className="w-5 h-5 text-purple-600"/>
                            <span className="font-semibold">{college.streams?.length || 0}+</span>
                            <span>Streams</span>
                         </div>
                         <div className="flex flex-col items-center space-y-1 p-2 bg-slate-50 rounded-md">
                            <Users className="w-5 h-5 text-indigo-600"/>
                            <span className="font-semibold">{college.facultyCount || 'N/A'}</span>
                            <span>Faculty</span>
                         </div>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        <Badge className={getNAACColor(college.naacGrade)}>NAAC: {college.naacGrade || 'Not Available'}</Badge>
                        <Badge variant="outline">{college.affiliation}</Badge>
                    </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                    <div className="flex items-center justify-between w-full">
                        <Button size="sm" variant="outline" onClick={onViewDetails}>View Details</Button>
                        <Button size="sm" asChild>
                            <a href={college.website} target="_blank" rel="noopener noreferrer">
                                Apply Now
                            </a>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

// College Detail Modal Component
const CollegeDetailModal = ({ college, onClose }: { college: College | null, onClose: () => void }) => {
    if (!college) return null;

    return (
        <Dialog open={!!college} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{college['College Name']}</DialogTitle>
                    <DialogDescription className="flex items-center pt-1">
                        <MapPin className="w-4 h-4 mr-2" /> {college.District}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                    {college.description && <p className="text-sm text-gray-600">{college.description}</p>}
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2"><Award className="w-4 h-4 text-yellow-600" /><span><strong>NAAC Grade:</strong> {college.naacGrade || 'N/A'}</span></div>
                        <div className="flex items-center space-x-2"><Building className="w-4 h-4 text-gray-500" /><span><strong>Affiliation:</strong> {college.affiliation || 'N/A'}</span></div>
                        <div className="flex items-center space-x-2"><GraduationCap className="w-4 h-4 text-blue-600" /><span><strong>Levels:</strong> {college['Level (UG/PG/Both)']}</span></div>
                        <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-indigo-600" /><span><strong>Faculty:</strong> ~{college.facultyCount || 'N/A'}</span></div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Streams Offered</h4>
                        <div className="flex flex-wrap gap-2">
                            {(college.streams || []).map(stream => <Badge key={stream} variant="secondary">{stream}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Facilities</h4>
                        <div className="flex flex-wrap gap-2">
                            {(college.facilities || []).map(facility => <Badge key={facility} variant="outline">{facility}</Badge>)}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <div className="flex space-x-2">
                          {college.website && <Button asChild variant="outline" size="icon"><a href={college.website} target="_blank" rel="noopener noreferrer" title="Website"><Globe className="w-4 h-4" /></a></Button>}
                          {college.email && <Button asChild variant="outline" size="icon"><a href={`mailto:${college.email}`} title="Email"><Mail className="w-4 h-4" /></a></Button>}
                          {college.phone && <Button asChild variant="outline" size="icon"><a href={`tel:${college.phone}`} title="Phone"><Phone className="w-4 h-4" /></a></Button>}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};


// --- MAIN COMPONENT ---

export function CollegeLocator() {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedNAAC, setSelectedNAAC] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [activeTab, setActiveTab] = useState('grid');
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  
  // Memoized lists for performance
  const districts = useMemo(() => ['all', ...Array.from(new Set(allColleges.map(c => c.District))).sort()], []);
  const streams = useMemo(() => ['all', ...Array.from(new Set(allColleges.flatMap(c => c.streams || []))).sort()], []);
  
  // Effect for fetching user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        (error) => console.warn('Error getting user location:', error)
      );
    }
  }, []);

  // Calculate distances once user location is available
  const collegesWithDistance = useMemo(() => {
    if (!userLocation) return allColleges;
    
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371; // Radius of the Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    return allColleges.map(college => ({
        ...college,
        distance: college.latitude && college.longitude ? calculateDistance(userLocation.latitude, userLocation.longitude, college.latitude, college.longitude) : undefined
    }));
  }, [userLocation]);

  // Filtering and Sorting Logic
  const filteredAndSortedColleges = useMemo(() => {
    let colleges = collegesWithDistance
        .filter(college => {
            const matchesSearch = college['College Name'].toLowerCase().includes(searchTerm.toLowerCase()) || college.District.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDistrict = selectedDistrict === 'all' || college.District === selectedDistrict;
            const matchesStream = selectedStream === 'all' || college.streams?.includes(selectedStream);
            const matchesNAAC = selectedNAAC === 'all' || college.naacGrade === selectedNAAC;
            return matchesSearch && matchesDistrict && matchesStream && matchesNAAC;
        });

    colleges.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a['College Name'].localeCompare(b['College Name']);
            case 'naac':
                const gradeA = naacGradesOrder[a.naacGrade || ''] || 99;
                const gradeB = naacGradesOrder[b.naacGrade || ''] || 99;
                return gradeA - gradeB;
            case 'distance':
            default:
                if (a.distance !== undefined && b.distance !== undefined) return a.distance - b.distance;
                if (a.distance !== undefined) return -1;
                if (b.distance !== undefined) return 1;
                return 0;
        }
    });

    return colleges;
  }, [searchTerm, selectedDistrict, selectedStream, selectedNAAC, sortBy, collegesWithDistance]);
  
  const savedCollegesList = useMemo(() => allColleges.filter(c => savedColleges.includes(c.id)), [savedColleges]);

  const toggleSaveCollege = (collegeId: string) => {
    setSavedColleges(prev => prev.includes(collegeId) ? prev.filter(id => id !== collegeId) : [...prev, collegeId]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('all');
    setSelectedStream('all');
    setSelectedNAAC('all');
    setSortBy('distance');
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 mb-8 bg-white rounded-xl shadow-sm"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">J&K College Finder 🎓</h1>
        <p className="text-lg text-gray-500 mt-2">Discover Government Degree Colleges Across Jammu & Kashmir</p>
      </motion.div>
      
      {/* --- FILTERS & CONTROLS --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-700" />
              <span>Find Your Perfect College</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by college name or district..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger><SelectValue placeholder="All Districts" /></SelectTrigger>
                <SelectContent>{districts.map((d) => <SelectItem key={d} value={d}>{d === 'all' ? 'All Districts' : d}</SelectItem>)}</SelectContent>
              </Select>

              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger><SelectValue placeholder="All Streams" /></SelectTrigger>
                <SelectContent>{streams.map((s) => <SelectItem key={s} value={s}>{s === 'all' ? 'All Streams' : s}</SelectItem>)}</SelectContent>
              </Select>

              <Select value={selectedNAAC} onValueChange={setSelectedNAAC}>
                <SelectTrigger><SelectValue placeholder="All NAAC Grades" /></SelectTrigger>
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
               <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger><div className="flex items-center gap-2"><ChevronsUpDown className="w-4 h-4"/> Sort By</div></SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="naac">NAAC Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* --- TABS & CONTENT --- */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="saved">
            <div className="flex items-center gap-2">
              Saved <Badge variant={savedColleges.length > 0 ? "default" : "secondary"}>{savedColleges.length}</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <div className="mt-4 text-sm text-gray-600 mb-4">
          Showing {activeTab === 'saved' ? savedCollegesList.length : filteredAndSortedColleges.length} colleges
        </div>

        <TabsContent value="grid">
          <AnimatePresence>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedColleges.map((college) => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  isSaved={savedColleges.includes(college.id)}
                  onSaveToggle={() => toggleSaveCollege(college.id)}
                  onViewDetails={() => setSelectedCollege(college)}
                />
              ))}
            </div>
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="saved">
           <AnimatePresence>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedCollegesList.map((college) => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  isSaved={true}
                  onSaveToggle={() => toggleSaveCollege(college.id)}
                  onViewDetails={() => setSelectedCollege(college)}
                />
              ))}
            </div>
          </AnimatePresence>
           {savedCollegesList.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Saved Colleges</h3>
                  <p className="text-gray-500">Click the heart icon on a college to save it here.</p>
              </motion.div>
          )}
        </TabsContent>

        <TabsContent value="map">
          <Card>
             <MapView colleges={filteredAndSortedColleges} userLocation={userLocation} />
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* --- NO RESULTS VIEW --- */}
      {filteredAndSortedColleges.length === 0 && activeTab === 'grid' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Colleges Found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </motion.div>
      )}
      
      {/* --- MODAL --- */}
      <CollegeDetailModal college={selectedCollege} onClose={() => setSelectedCollege(null)} />
    </div>
  );
}