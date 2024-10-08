import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

const ShowCourses = async () => {
  const session = await auth();
  const user = session?.user;
  const courses = await prisma.course.findMany(
    {
      where: {
        staffId: user?.id
      }
    }
  )
  return (
    <div>
      {courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link
                  href={`/course?cid=${course.id}`}
                  key={course.id}
                  className="block hover:no-underline"
                >
                  <Card className="h-full transition-all hover:shadow-lg ">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className="mb-2">
                          {course.code}
                        </Badge>
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <CardTitle className="text-xl leading-tight">
                        {course.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm line-clamp-3">
                        {course.description || "No description available."}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
      ) : (
        <div className="text-center text-gray-500 text-lg my-6">No Courses Available</div>
      )}
    </div>

  )
}

export default ShowCourses