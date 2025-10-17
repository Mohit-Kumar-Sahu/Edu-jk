import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Building, Award, Users, BookCheck, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const institutionData = {
    name: "Indian Institute of Management Raipur",
    aisheCode: "U-1017",
    naacGrade: "A++",
    stats: { students: 12500, faculty: 850, dropoutRate: 2.1, },
    placements: { rate: "98%", highestPackage: "₹ 45 LPA", avgPackage: "₹ 21 LPA" },
};

export function InstitutionDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50/50 min-h-screen">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{institutionData.name}</h1>
            <p className="text-muted-foreground">Welcome, {user?.displayName || "Admin"} | AISHE Code: {institutionData.aisheCode}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users />} title="Total Students" value={institutionData.stats.students.toLocaleString()} trend="+5% from last year" />
            <StatCard icon={<Users />} title="Total Faculty" value={institutionData.stats.faculty} trend="+10 new hires" />
            <StatCard icon={<TrendingDown className="text-green-500"/>} title="Dropout Rate" value={`${institutionData.stats.dropoutRate}%`} trend="-0.3% from last year" />
            <StatCard icon={<Award />} title="NAAC Grade" value={institutionData.naacGrade} trend="Re-accredited 2024" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Placement Overview</CardTitle>
                    <CardDescription>Summary of the 2024-2025 placement season.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoBox title="Placement Rate" value={institutionData.placements.rate} icon={<TrendingUp />} />
                    <InfoBox title="Highest Package" value={institutionData.placements.highestPackage} icon={<DollarSign />} />
                    <InfoBox title="Average Package" value={institutionData.placements.avgPackage} icon={<DollarSign />} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Compliance Status</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <ComplianceItem title="NAAC" status="Accredited" grade="A++" />
                    <ComplianceItem title="NBA (CSE)" status="Accredited" />
                    <ComplianceItem title="UGC" status="Compliant" />
                    <ComplianceItem title="AICTE" status="Compliant" />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

const StatCard = ({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string | number, trend: string }) => (
    <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{title}</CardTitle><div className="text-muted-foreground">{icon}</div></CardHeader><CardContent><div className="text-2xl font-bold">{value}</div><p className="text-xs text-muted-foreground">{trend}</p></CardContent></Card>
);

const InfoBox = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode; }) => (
    <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-muted-foreground flex items-center gap-2">{icon} {title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const ComplianceItem = ({ title, status, grade }: { title: string; status: string; grade?: string; }) => (
    <div className="flex justify-between items-center p-2.5 bg-gray-100 rounded-lg">
        <p className="font-semibold">{title}</p>
        <div>
            <Badge variant={status === "Accredited" || status === "Compliant" ? "default" : "secondary"}>{status}</Badge>
            {grade && <Badge variant="outline" className="ml-2">{grade}</Badge>}
        </div>
    </div>
);
