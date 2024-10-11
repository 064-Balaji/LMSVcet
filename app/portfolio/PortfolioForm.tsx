'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, MinusCircle } from "lucide-react"

export default function PortfolioForm() {
  const [education, setEducation] = useState([{ degree: '', specialization: '', year: '', college: '', university: '' }])
  const [employment, setEmployment] = useState([{ position: '', institution: '', duration: '' }])
  const [awards, setAwards] = useState([''])
  const [patents, setPatents] = useState([''])
  const [publications, setPublications] = useState([''])

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
  }

  const handleEmploymentChange = (index: number, field: string, value: string) => {
    const newEmployment = [...employment]
    newEmployment[index][field] = value
    setEmployment(newEmployment)
  }

  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newArray = [...prev]
      newArray[index] = value
      return newArray
    })
  }

  const addField = (setter: React.Dispatch<React.SetStateAction<any[]>>, defaultValue: any) => {
    setter(prev => [...prev, defaultValue])
  }

  const removeField = (setter: React.Dispatch<React.SetStateAction<any[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="my-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Dr. Jane Doe" required />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Associate Professor of Computer Science" required />
            </div>
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" placeholder="Department of Computer Science and Engineering" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane.doe@university.edu" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea id="bio" placeholder="Enter your professional biography" required />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Employment History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {employment.map((job, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input 
                    id={`position-${index}`} 
                    value={job.position} 
                    onChange={(e) => handleEmploymentChange(index, 'position', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input 
                    id={`institution-${index}`} 
                    value={job.institution} 
                    onChange={(e) => handleEmploymentChange(index, 'institution', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`duration-${index}`}>Duration</Label>
                  <Input 
                    id={`duration-${index}`} 
                    value={job.duration} 
                    onChange={(e) => handleEmploymentChange(index, 'duration', e.target.value)} 
                    required 
                  />
                </div>
              </div>
              {index > 0 && (
                <Button type="button" variant="destructive" onClick={() => removeField(setEmployment, index)}>
                  <MinusCircle className="mr-2 h-4 w-4" /> Remove Employment
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addField(setEmployment, { position: '', institution: '', duration: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Employment
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Educational Qualifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input 
                    id={`degree-${index}`} 
                    value={edu.degree} 
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`specialization-${index}`}>Specialization</Label>
                  <Input 
                    id={`specialization-${index}`} 
                    value={edu.specialization} 
                    onChange={(e) => handleEducationChange(index, 'specialization', e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`year-${index}`}>Year</Label>
                  <Input 
                    id={`year-${index}`} 
                    value={edu.year} 
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`college-${index}`}>College</Label>
                  <Input 
                    id={`college-${index}`} 
                    value={edu.college} 
                    onChange={(e) => handleEducationChange(index, 'college', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`university-${index}`}>University</Label>
                  <Input 
                    id={`university-${index}`} 
                    value={edu.university} 
                    onChange={(e) => handleEducationChange(index, 'university', e.target.value)} 
                    required 
                  />
                </div>
              </div>
              {index > 0 && (
                <Button type="button" variant="destructive" onClick={() => removeField(setEducation, index)}>
                  <MinusCircle className="mr-2 h-4 w-4" /> Remove Education
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addField(setEducation, { degree: '', specialization: '', year: '', college: '', university: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </CardContent>
      </Card>



      <Card>
        <CardHeader>
          <CardTitle>Employment History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {employment.map((job, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input 
                    id={`position-${index}`} 
                    value={job.position} 
                    onChange={(e) => handleEmploymentChange(index, 'position', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input 
                    id={`institution-${index}`} 
                    value={job.institution} 
                    onChange={(e) => handleEmploymentChange(index, 'institution', e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor={`duration-${index}`}>Duration</Label>
                  <Input 
                    id={`duration-${index}`} 
                    value={job.duration} 
                    onChange={(e) => handleEmploymentChange(index, 'duration', e.target.value)} 
                    required 
                  />
                </div>
              </div>
              {index > 0 && (
                <Button type="button" variant="destructive" onClick={() => removeField(setEmployment, index)}>
                  <MinusCircle className="mr-2 h-4 w-4" /> Remove Employment
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addField(setEmployment, { position: '', institution: '', duration: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Employment
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scholarships and Awards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {awards.map((award, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                value={award} 
                onChange={(e) => handleArrayChange(setAwards, index, e.target.value)} 
                placeholder="Award or Scholarship" 
                required 
              />
              {index > 0 && (
                <Button type="button" variant="destructive" onClick={() => removeField(setAwards, index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addField(setAwards, '')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Award
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patent Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patents.map((patent, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                value={patent} 
                onChange={(e) => handleArrayChange(setPatents, index, e.target.value)} 
                placeholder="Patent details" 
                required 
              />
              {index > 0 && (
                <Button type="button" variant="destructive" onClick={() => removeField(setPatents, index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addField(setPatents, '')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Patent
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {publications.map((publication, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                value={publication} 
                onChange={(e) => handleArrayChange(setPublications, index, e.target.value)} 
                placeholder="Publication details" 
                required 
              />
              {index > 0 && (
                <Button type="button" variant="destructive" onClick={() => removeField(setPublications, index)}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={() => addField(setPublications, '')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Publication
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Google Scholar ID</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="scholarId">Google Scholar ID</Label>
          <Input id="scholarId" placeholder="Enter your Google Scholar ID" />
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Submit Portfolio</Button>
    </form>
  )
}