import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { User, Users, BookOpen, Star, Target } from 'lucide-react';

// Hardcoded data for the Teacher Dashboard
const teacherData = {
  name: "Dr. Anil Kumar",
  institutionName: "Indian Institute of Management Bangalore",
  studentFacultyRatio: "15:1",
  researchPublications: [
    { title: "Quantum Computing Models", journal: "IEEE Spectrum", year: 2024 },
    { title: "Market Dynamics in Web3", journal: "Journal of Finance", year: 2023 },
  ],
  projectsGuided: 5,
  performance: {
    studentFeedback: 4.8,
    contributionScore: 92
  }
};

export function TeacherDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center space-x-4">
        <User className="w-10 h-10 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">Welcome, {teacherData.name}!</h1>
          <p className="text-muted-foreground">{teacherData.institutionName}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Feedback</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teacherData.performance.studentFeedback} / 5.0</div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Publications</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{teacherData.researchPublications.length}</div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Student-Faculty Ratio</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{teacherData.studentFacultyRatio}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects Guided</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{teacherData.projectsGuided}</div>
            </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Recent Research Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Publication Title</TableHead>
                  <TableHead>Journal</TableHead>
                  <TableHead className="text-right">Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherData.researchPublications.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.journal}</TableCell>
                    <TableCell className="text-right">{item.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
