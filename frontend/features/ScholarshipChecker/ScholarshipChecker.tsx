"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ExternalLink, CheckCircle, FileText } from 'lucide-react';

interface Scholarship {
  name: string;
  image: string; // Placeholder for image path
  link: string;
  eligibility: string[];
  documents: string[];
}

const scholarships: Scholarship[] = [
  {
    name: "Prime Minister's Special Scholarship Scheme (PMSSS) / J&K Special Scholarship Scheme",
    image: "/images/image1.png", // Replace with your image path
    link: "https://aicte-jk-scholarship-gov.in/",
    eligibility: [
      "Passed Class 12 from the J&K board or CBSE-affiliated schools in J&K.",
      "Must be pursuing a general, professional, or medical degree course at a prescribed college outside J&K.",
      "Annual family income less than ₹8,00,000.",
      "Students who have completed a 10+3 diploma from J&K Polytechnics can also apply for direct entry in the second year."
    ],
    documents: [
      "Domicile certificate of J&K / Ladakh.",
      "Class 10 and 12 mark sheets.",
      "Aadhaar Card.",
      "Family Income Certificate issued by a competent authority.",
      "Category / Caste Certificate (if applicable).",
      "Disability Certificate (if applicable).",
      "Passport size photograph and applicant’s signature."
    ]
  },
  {
    name: "Post Matric Scholarship for ST/SC/OBC/EBC/PC/DNT Students, J&K",
    image: "/images/image2.png", // Replace with your image path
    link: "https://scholarships.gov.in/",
    eligibility: [
      "Must be a domicile of Jammu & Kashmir.",
      "Belong to ST, SC, OBC, EBC, PC or DNT category.",
      "Pursuing studies at a post-matriculation level (class 11 to PhD) within or outside J&K.",
      "Annual family income less than ₹1,00,000 for OBC, EBC, and PC candidates.",
      "Annual family income less than ₹2,50,000 for ST, SC, and DNTs."
    ],
    documents: [
      "Permanent resident certificate.",
      "Fee receipt and attested fee structure.",
      "Promotion certificate (duly attested).",
      "Income certificate of parents/guardian.",
      "Category certificate (if applicable).",
      "Disability certificate (if applicable).",
      "Aadhaar number and a copy of the bank passbook."
    ]
  },
  {
    name: "Combined Counselling Board (CCB) Scholarship, J&K",
    image: "/images/image3.png", // Replace with your image path
    link: "https://combinedcounsellingboard.com/jammu-kashmir.php",
    eligibility: [
      "Students studying at the college/university level (diploma, degree, or postgraduate) can apply.",
      "Must have passed the last qualifying examination with at least 40% to 50% marks.",
      "The college/course must be one of the CCB participating institutions."
    ],
    documents: [
      "Mark sheets of previous examinations (10th, 12th, or qualifying exam).",
      "Domicile Certificate for J&K.",
      "Annual/family income certificate.",
      "Caste/Category or Disability Certificate (if applicable).",
      "Passport-size photograph and signature scan."
    ]
  },
  {
    name: "Central Sector Scheme of Scholarship for College & University Students (CSSS)",
    image: "/images/image4.png", // Replace with your image path
    link: "https://scholarships.gov.in/",
    eligibility: [
      "Must have passed Class XII (10+2) with the required merit, often in the top 20th percentile of pass-outs from the Board.",
      "Must be pursuing a regular full-time undergraduate or postgraduate course.",
      "Annual family income must be ₹4,50,000 or less.",
      "Should not be receiving another central or state scholarship."
    ],
    documents: [
      "Aadhaar Card or equivalent identity proof.",
      "Class 12 mark sheet.",
      "Bank passbook (account in applicant’s name) for DBT.",
      "Income certificate issued by a competent authority.",
      "Caste or Disability certificate (if applicable)."
    ]
  },
  {
    name: "NSP Centrally Sponsored Post-Matric Scholarship for SC Students",
    image: "/images/image5.png", // Replace with your image path
    link: "https://scholarships.gov.in/",
    eligibility: [
      "Be a Scheduled Caste (SC) student.",
      "Be a domicile (resident) in Jammu & Kashmir.",
      "Studying a post-matriculation course (e.g., Class 11/12, diploma, UG/PG) in a recognized institution.",
      "Annual parent(s) / guardian(s) income must not exceed ₹2,50,000."
    ],
    documents: [
      "Passport-size photograph.",
      "Copies of academic transcripts / marksheets / certificates.",
      "Valid Caste Certificate (SC).",
      "Income Certificate of parent(s)/guardian(s).",
      "Proof of domicile / permanent resident certificate."
    ]
  }
];

export function ScholarshipChecker() {
  return (
    <div className="p-4 md:p-6 space-y-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Government Scholarships for J&K Students</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore and apply for various scholarships available to students in Jammu & Kashmir. Click on a scholarship to visit the official application portal.
        </p>
      </motion.div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={scholarship.image} alt={`${scholarship.name} logo`} className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm" />
                  <CardTitle className="text-xl sm:text-lg font-bold text-gray-800 leading-tight">{scholarship.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-4 sm:p-6 flex-grow">
                <div>
                  <h3 className="flex items-center text-md font-semibold text-blue-600 mb-3">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Eligibility Criteria
                  </h3>
                  <ul className="list-none text-sm text-gray-700 space-y-2">
                    {scholarship.eligibility.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center text-md font-semibold text-blue-600 mb-3">
                    <FileText className="h-5 w-5 mr-2 text-orange-500" />
                    Documents Required
                  </h3>
                  <ul className="list-none text-sm text-gray-700 space-y-2">
                    {scholarship.documents.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
                <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}