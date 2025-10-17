import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  BookOpen, Star, Target, Presentation, ChevronRight, Upload, Calendar, BarChart3, Users, FilePlus
} from 'lucide-react';
import { Progress } from './ui/progress';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

// --- MOCK DATA FOR A PROFESSIONAL LOOK ---
const teacherData = {
    name: "Dr. Anil Kumar",
    institutionName: "Indian Institute of Management Bangalore",
    courses: [
        { name: "Quantum Computing Models", code: "CS701", students: 45, avgPerformance: 88, nextClass: "Oct 20, 10:00 AM" },
        { name: "Market Dynamics in Web3", code: "FIN605", students: 62, avgPerformance: 91, nextClass: "Oct 21, 02:00 PM" },
        { name: "Advanced Algorithms", code: "CS502", students: 50, avgPerformance: 82, nextClass: "Oct 22, 11:00 AM" },
    ],
    performance: {
        studentFeedback: 4.8,
        feedbackDistribution: [ // Data for the bar chart
            { rating: 5, count: 120 },
            { rating: 4, count: 35 },
            { rating: 3, count: 5 },
            { rating: 2, count: 1 },
            { rating: 1, count: 0 },
        ]
    },
    publications: [
        { title: "A Novel Approach to Quantum Encryption", journal: "IEEE Spectrum", year: 2024, status: "Published" },
        { title: "Behavioral Economics in Decentralized Finance", journal: "Journal of Finance", year: 2023, status: "Published" },
        { title: "AI-driven Predictive Market Models", journal: "Nature AI", year: 2024, status: "Under Review" },
    ],
    projectsGuided: 5,
    upcomingDeadlines: [
        { task: "Grade Mid-term Papers for CS701", due: "Oct 25, 2025" },
        { task: "Submit Research Grant Proposal", due: "Nov 05, 2025" },
    ]
};

// --- MAIN DASHBOARD COMPONENT ---
export function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50/75 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName || "Professor"}!</h1>
                <p className="text-muted-foreground">Here is your teaching and research summary for Fall 2025.</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">View Analytics</Button>
                <Button>+ New Course</Button>
            </div>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Presentation size={20} />} title="Active Courses" value={teacherData.courses.length} />
            <StatCard icon={<Star size={20} />} title="Avg. Student Feedback" value={`${teacherData.performance.studentFeedback} / 5.0`} />
            <StatCard icon={<BookOpen size={20} />} title="Total Publications" value={teacherData.publications.length} />
            <StatCard icon={<Target size={20} />} title="Projects Guided" value={teacherData.projectsGuided} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Courses and Publications */}
            <div className="lg:col-span-2 space-y-8">
                {/* Assigned Courses Section */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>My Courses</CardTitle>
                        <CardDescription>Overview of your currently assigned courses and student performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%]">Course</TableHead>
                                    <TableHead>Students</TableHead>
                                    <TableHead>Avg. Performance</TableHead>
                                    <TableHead>Next Class</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teacherData.courses.map((course) => (
                                    <TableRow key={course.code}>
                                        <TableCell>
                                            <div className="font-medium text-gray-800">{course.name}</div>
                                            <div className="text-sm text-muted-foreground">{course.code}</div>
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2 pt-4">
                                            <Users size={14} className="text-gray-500" />
                                            {course.students}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={course.avgPerformance} className="w-24 h-2" />
                                                <span className="text-sm font-semibold">{course.avgPerformance}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{course.nextClass}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Research & Publications Section */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Research & Publications</CardTitle>
                        <CardDescription>A list of your recent and ongoing publications.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {teacherData.publications.map((pub, index) => (
                            <PublicationItem key={index} title={pub.title} journal={pub.journal} year={pub.year} status={pub.status} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Analytics and Actions */}
            <div className="space-y-8">
                {/* Performance Analytics */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Performance Analytics</CardTitle>
                        <CardDescription>Distribution of student feedback ratings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FeedbackChart data={teacherData.performance.feedbackDistribution} />
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <ActionItem icon={<Upload size={16} />} title="Upload New Study Material" />
                        <ActionItem icon={<Calendar size={16} />} title="Schedule a Test" />
                        <ActionItem icon={<BarChart3 size={16} />} title="View Student Analytics" />
                        <ActionItem icon={<FilePlus size={16} />} title="Submit Research Paper" />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

// --- HELPER & UI COMPONENTS ---

const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) => (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
            <div className="text-blue-600">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
        </CardContent>
    </Card>
);

const ActionItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
    <Link to="#" className="block p-3 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-medium text-sm text-gray-700">{title}</span>
            </div>
            <ChevronRight className="text-muted-foreground" size={16} />
        </div>
    </Link>
);

const PublicationItem = ({ title, journal, year, status }: { title: string, journal: string, year: number, status: string }) => (
    <div className="mb-4 pb-4 border-b last:border-b-0">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-muted-foreground">{journal} - {year}</p>
            </div>
            <Badge variant={status === "Published" ? "default" : "secondary"}>{status}</Badge>
        </div>
    </div>
);

// A simple, dependency-free SVG Bar Chart component
const FeedbackChart = ({ data }: { data: { rating: number; count: number }[] }) => {
    const maxCount = Math.max(...data.map(d => d.count), 0);
    const chartHeight = 150;
    const barWidth = 30;
    const gap = 15;

    return (
        <div className="w-full">
            <svg width="100%" height={chartHeight + 20} aria-labelledby="chartTitle">
                <title id="chartTitle">Student Feedback Distribution</title>
                {data.map((d, i) => {
                    const barHeight = maxCount > 0 ? (d.count / maxCount) * chartHeight : 0;
                    const x = i * (barWidth + gap);
                    const y = chartHeight - barHeight;
                    return (
                        <g key={d.rating}>
                            <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={barHeight}
                                fill="#2563eb"
                                rx="4"
                                ry="4"
                            />
                            <text
                                x={x + barWidth / 2}
                                y={y - 5}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#374151"
                                fontWeight="600"
                            >
                                {d.count}
                            </text>
                             <text
                                x={x + barWidth / 2}
                                y={chartHeight + 15}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#6b7280"
                            >
                                {d.rating}★
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
