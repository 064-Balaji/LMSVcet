'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, Briefcase, File, FileText, GraduationCap, Link, Medal, Scroll } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const PortfolioPage = () => {
  const professorData = {
    name: "Dr. Jane Doe",
    title: "Associate Professor of Computer Science",
    department: "Department of Computer Science and Engineering",
    email: "jane.doe@university.edu",
    phone: "+1 (555) 123-4567",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Jane Doe is an Associate Professor specializing in Network Security and Machine Learning. With over 15 years of experience in academia and research, she has contributed significantly to the fields of cybersecurity and artificial intelligence.",
    education: [
      {
        degree: "Ph.D",
        specialization: "Network Security and Machine Learning",
        year: "2015",
        college: "Thiagarajar College of Engineering, Madurai",
        university: "Anna University"
      },
      {
        degree: "M.E",
        specialization: "Computer Science and Engineering",
        year: "2010",
        college: "Thiagarajar College of Engineering, Madurai",
        university: "Anna University"
      },
      {
        degree: "B.Tech",
        specialization: "Information Technologies",
        year: "2005",
        college: "Thiagarajar College of Engineering, Madurai",
        university: "Anna University"
      }
    ],
    employment: [
      {
        position: "Associate Professor",
        institution: "Current University",
        duration: "2018 - Present"
      },
      {
        position: "Assistant Professor",
        institution: "Previous University",
        duration: "2015 - 2018"
      },
      {
        position: "Research Associate",
        institution: "Research Institute",
        duration: "2010 - 2015"
      }
    ],
    awards: [
      "Best Paper Award, International Conference on Cybersecurity, 2019",
      "Young Researcher Award, National Science Foundation, 2017",
      "University Teaching Excellence Award, 2016"
    ],
    patents: [
      "Secure Network Protocol for IoT Devices (Patent No: US 9876543)",
      "Machine Learning Algorithm for Intrusion Detection (Patent No: US 8765432)"
    ],
    publications: [
      "Doe, J., et al. (2020). 'Advanced Machine Learning Techniques for Network Security.' Journal of Cybersecurity, 15(2), 123-145.",
      "Doe, J., & Smith, A. (2019). 'Artificial Intelligence in Intrusion Detection Systems.' Proceedings of the International Conference on AI and Security, 78-92.",
      "Doe, J. (2018). 'A Survey of Emerging Threats in Cloud Computing.' IEEE Transactions on Cloud Security, 10(3), 1-15."
    ],
    googleScholarEmbed: '<iframe src="https://scholar.google.com/citations?user=SCHOLAR_ID&hl=en" width="100%" height="600" frameborder="0"></iframe>'
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className='grid grid-cols-4 items-center'>
        <CardContent className="col-span-3 flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={''} />
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{professorData.name}</h1>
            <p className="text-xl text-muted-foreground">{professorData.title}</p>
            <p className="text-muted-foreground">{professorData.department}</p>
            <div className="mt-2">
              <p>{professorData.email}</p>
              <p>{professorData.phone}</p>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <div className=' flex items-center justify-center rounded-lg'>
            <File height={100} width={100} />
            <h1>View PDF</h1>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2" /> Biography
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{professorData.bio}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2" /> Educational Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Degree</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>College</TableHead>
                <TableHead>University</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professorData.education.map((edu, index) => (
                <TableRow key={index}>
                  <TableCell>{edu.degree}</TableCell>
                  <TableCell>{edu.specialization}</TableCell>
                  <TableCell>{edu.year}</TableCell>
                  <TableCell>{edu.college}</TableCell>
                  <TableCell>{edu.university}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="mr-2" /> Employment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professorData.employment.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>{job.institution}</TableCell>
                  <TableCell>{job.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Medal className="mr-2" /> Scholarships and Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {professorData.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Scroll className="mr-2" /> Patent Rights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {professorData.patents.map((patent, index) => (
              <li key={index}>{patent}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2" /> Publications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {professorData.publications.map((publication, index) => (
              <li key={index}>{publication}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="mr-2" /> Google Scholar Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: professorData.googleScholarEmbed }} />
        </CardContent>
      </Card>
    </div>
  )
}

export default PortfolioPage