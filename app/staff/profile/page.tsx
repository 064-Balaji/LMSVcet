import React from 'react'
import { Mail, Phone, LogOut, LinkIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import EditProfile from './EditProfile'
import PortfolioForm from '@/app/portfolio/PortfolioForm'

const userData = {
    avatar: "/placeholder.svg?height=200&width=200",
}

export default async function StaffProfilePage() {
    const session = await auth();
    const staffData = await prisma.staff.findUnique({
        where: { id: session?.user.id },
        include: { department: true, section: true, courses: true }
    })
    const departMentDetail = await prisma.department.findUnique({
        where: {
            id: staffData?.departmentId
        }
    })
    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex items-center justify-between mb-8'>
                <h1 className="text-3xl font-bold  capitalize">Hi There {staffData?.staffName} !</h1>
                <Link href={`/portfolio/${staffData?.id}`}>

                    <Button variant='secondary' className='text-xl p-2 rounded-md shadow-md'>
                        View My Page <LinkIcon className='ml-2' />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Your Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <Avatar className="h-32 w-32 mb-4">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback>{staffData?.staffName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <EditProfile userData={staffData} />
                        </div>
                        <div className="space-y-4 my-4">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-gray-500" />
                                <span>{staffData?.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-gray-500" />
                                <span>{staffData?.staffPhone}</span>
                            </div>
                            {/* <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{userData.location}</span>
              </div> */}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Students Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-blue-600"></div>
                                <div className="text-sm text-gray-600"></div>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-green-600"></div>
                                <div className="text-sm text-gray-600"></div>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-yellow-600"></div>
                                <div className="text-sm text-gray-600"></div>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg">
                                <div className="text-3xl font-bold text-purple-600"></div>
                                <div className="text-sm text-gray-600"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Your Recent Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {staffData?.courses.map((course, index) => (
                            <div key={index} className='grid grid-cols-2 gap-4 w-full mb-4'>
                                <div className="flex flex-col justify-center p-4 rounded-lg">
                                    <p className="font-semibold">Created {course.title} Course</p>
                                    <p className="font-medium uppercase">{course.code}</p>
                                    <p className="text-sm text-gray-500">Created On</p>
                                </div>
                                <div className="flex justify-end items-center">
                                    <Button>
                                        <Link href={`/course?cid=${course.id}`}>View</Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <PortfolioForm />
            <Button variant="destructive" className="mt-8">
                <LogOut className="mr-2 h-4 w-4" />
                <Link href={"/api/auth/signout"}>Log Out</Link>
            </Button>
        </div>
    )
}