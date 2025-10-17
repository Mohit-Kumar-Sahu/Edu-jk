import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import {
  Building, Award, Users, BookCheck, TrendingUp, TrendingDown, DollarSign, CheckCircle, MapPin
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

// --- MOCK DATA FOR A PROFESSIONAL LOOK ---
const institutionData = {
    name: "Indian Institute of Management Raipur",
    aisheCode: "U-1017",
    naacGrade: "A++",
    stats: {
        students: { value: 12500, trend: 5.2, trendDirection: 'up' },
        faculty: { value: 850, trend: 10, trendDirection: 'up' },
        dropoutRate: { value: 2.1, trend: 0.3, trendDirection: 'down' },
    },
    placements: {
        rate: "98%",
        highestPackage: "₹ 45 LPA",
        avgPackage: "₹ 21 LPA",
        topRecruiters: ["Google", "Microsoft", "Bain & Co.", "Accenture"],
    },
    funds: [
        { scheme: "National Research Fund", allocated: 5000000, utilized: 4500000, currency: "₹" },
        { scheme: "Digital India Initiative", allocated: 2500000, utilized: 2450000, currency: "₹" },
        { scheme: "Skill India Mission", allocated: 3000000, utilized: 2100000, currency: "₹" },
    ],
    alumni: {
        total: 25000,
        notableCompanies: 500,
        locations: ["Bangalore", "Mumbai", "San Francisco", "London"],
    }
};

// --- MAIN DASHBOARD COMPONENT ---
export function InstitutionDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50/75 min-h-screen">
        {/* Header Section */}
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{institutionData.name}</h1>
            <p className="text-muted-foreground">Welcome, {user?.displayName || "Admin"} | AISHE Code: {institutionData.aisheCode}</p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users />} title="Total Students" value={institutionData.stats.students.value.toLocaleString()} trend={`+${institutionData.stats.students.trend}%`} trendDirection="up" />
            <StatCard icon={<Users />} title="Total Faculty" value={institutionData.stats.faculty.value} trend={`+${institutionData.stats.faculty.trend} new hires`} trendDirection="up" />
            <StatCard icon={<TrendingDown />} title="Dropout Rate" value={`${institutionData.stats.dropoutRate.value}%`} trend={`-${institutionData.stats.dropoutRate.trend}%`} trendDirection="down" />
            <StatCard icon={<Award />} title="NAAC Grade" value={institutionData.naacGrade} trend="Re-accredited 2024" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Placements and Funds */}
            <div className="lg:col-span-2 space-y-8">
                {/* Placement & Employability */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Placement & Employability</CardTitle>
                        <CardDescription>Summary of the 2024-2025 placement season.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InfoBox title="Placement Rate" value={institutionData.placements.rate} icon={<TrendingUp />} />
                        <InfoBox title="Highest Package" value={institutionData.placements.highestPackage} icon={<DollarSign />} />
                        <InfoBox title="Average Package" value={institutionData.placements.avgPackage} icon={<DollarSign />} />
                    </CardContent>
                </Card>

                {/* Government Fund Utilization */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Government Fund Utilization</CardTitle>
                        <CardDescription>Tracking of allocated vs. utilized funds from national schemes.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {institutionData.funds.map((fund, i) => (
                           <FundItem key={i} {...fund} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Alumni and Compliance */}
            <div className="space-y-8">
                {/* Alumni Network */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle>Alumni Network</CardTitle>
                        <CardDescription>Snapshot of the global alumni community.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <AlumniStat label="Total Alumni" value={institutionData.alumni.total.toLocaleString()} />
                        <AlumniStat label="Working in Fortune 500" value={institutionData.alumni.notableCompanies.toLocaleString()} />
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Top Locations</p>
                            <div className="flex flex-wrap gap-2">
                                {institutionData.alumni.locations.map(loc => <Badge key={loc} variant="secondary">{loc}</Badge>)}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance & Accreditation */}
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader><CardTitle>Compliance Status</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <ComplianceItem title="NAAC" status="Accredited" grade="A++" />
                        <ComplianceItem title="NBA (CSE)" status="Accredited" />
                        <ComplianceItem title="UGC" status="Compliant" />
                        <ComplianceItem title="AICTE" status="Compliant" />
                         <Button variant="outline" className="w-full mt-2">View All Reports</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

// --- HELPER & UI COMPONENTS ---

const StatCard = ({ icon, title, value, trend, trendDirection }: { icon: React.ReactNode, title: string, value: string | number, trend: string, trendDirection?: 'up' | 'down' }) => (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
            <div className="text-blue-600">{icon}</div>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold text-gray-800">{value}</div>
            <p className={`text-xs ${trendDirection === 'down' ? 'text-green-600' : 'text-muted-foreground'}`}>{trend}</p>
        </CardContent>
    </Card>
);

const InfoBox = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode; }) => (
    <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-muted-foreground flex items-center gap-2">{icon} {title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
);

const FundItem = ({ scheme, allocated, utilized, currency }: { scheme: string; allocated: number; utilized: number; currency: string; }) => {
    const percentage = Math.round((utilized / allocated) * 100);
    return (
        <div>
            <div className="flex justify-between mb-1">
                <p className="font-medium text-sm text-gray-700">{scheme}</p>
                <p className="text-sm font-semibold">{currency}{utilized.toLocaleString()} / {currency}{allocated.toLocaleString()}</p>
            </div>
            <Progress value={percentage} />
        </div>
    );
};

const ComplianceItem = ({ title, status, grade }: { title: string; status: string; grade?: string; }) => (
    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <p className="font-semibold text-sm">{title}</p>
        </div>
        <div>
            <Badge variant={status === "Accredited" || status === "Compliant" ? "default" : "secondary"}>{status}</Badge>
            {grade && <Badge variant="outline" className="ml-2">{grade}</Badge>}
        </div>
    </div>
);

const AlumniStat = ({ label, value }: { label: string; value: string; }) => (
    <div className="flex justify-between items-center border-b pb-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-bold text-gray-800">{value}</p>
    </div>
);
