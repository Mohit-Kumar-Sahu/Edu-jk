import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Building, Award, Users, BookCheck } from 'lucide-react';

// Hardcoded data for the Institution Dashboard
const institutionData = {
  name: "Indian Institute of Management Raipur",
  aisheCode: "U-1017",
  nirfRanking: [
    { param: "Teaching, Learning & Resources", score: 90.5 },
    { param: "Research and Professional Practice", score: 85.2 },
    { param: "Graduation Outcomes", score: 95.8 },
    { param: "Outreach and Inclusivity", score: 88.1 },
  ],
  naacGrade: "A++",
  employability: {
    placements: "98%",
    higherStudies: "2%",
  }
};

export function InstitutionDashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center space-x-4">
        <Building className="w-10 h-10 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">{institutionData.name}</h1>
          <p className="text-muted-foreground">AISHE Code: {institutionData.aisheCode}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NAAC Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{institutionData.naacGrade}</div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{institutionData.employability.placements}</div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NIRF Overall Score</CardTitle>
                <BookCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">89.9</div>
            </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>NIRF Ranking Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutionData.nirfRanking.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.param}</TableCell>
                    <TableCell className="text-right"><Badge>{item.score}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
