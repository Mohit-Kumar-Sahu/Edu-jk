import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Presentation, Star, BookOpen, Target, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const teacherData = {
    courses: [
        { name: "Quantum Computing Models", code: "CS701", students: 45, avgPerformance: 88 },
        { name: "Market Dynamics in Web3", code: "FIN605", students: 62, avgPerformance: 91 },
        { name: "Advanced Algorithms", code: "CS502", students: 50, avgPerformance: 82 },
    ],
    performance: { studentFeedback: 4.8 },
    publications: 12,
    projectsGuided: 5,
};

export function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50/50 min-h-screen">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName || "Professor"}!</h1>
                <p className="text-muted-foreground">Here is your teaching and research summary.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Presentation />} title="Active Courses" value={teacherData.courses.length} />
            <StatCard icon={<Star />} title="Avg. Student Feedback" value={`${teacherData.performance.studentFeedback} / 5.0`} />
            <StatCard icon={<BookOpen />} title="Total Publications" value={teacherData.publications} />
            <StatCard icon={<Target />} title="Projects Guided" value={teacherData.projectsGuided} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>Overview of your currently assigned courses and student performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Course</TableHead><TableHead>Students</TableHead><TableHead>Avg. Performance</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {teacherData.courses.map((course) => (
                                <TableRow key={course.code}>
                                    <TableCell><div className="font-medium">{course.name}</div><div className="text-sm text-muted-foreground">{course.code}</div></TableCell>
                                    <TableCell>{course.students}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress value={course.avgPerformance} className="w-20" />
                                            <span className="text-sm font-semibold">{course.avgPerformance}%</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    <ActionItem title="Upload New Study Material" />
                    <ActionItem title="Schedule a Test" />
                    <ActionItem title="View Student Analytics" />
                    <ActionItem title="Submit Research Paper" />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

// Helper components
const StatCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string | number }) => (
    <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{title}</CardTitle><div className="text-muted-foreground">{icon}</div></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div></CardContent></Card>
);

const ActionItem = ({ title }: { title: string }) => (
    <Link to="#" className="block p-3 rounded-md hover:bg-gray-100 transition-colors">
        <div className="flex items-center justify-between">
            <span className="font-medium text-sm">{title}</span>
            <ChevronRight className="text-muted-foreground" size={16} />
        </div>
    </Link>
);
