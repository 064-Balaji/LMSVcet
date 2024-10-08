import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma'
import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
          {courses.map(course => (
            <Card key={course.id} className="bg-white shadow-lg rounded-lg border-none hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white text-lg font-bold p-4 rounded-t-lg shadow-md">
                {course.title}
              </CardHeader>
              <CardContent className="p-4 bg-white dark:bg-gray-100 rounded-b-lg">
                <p className="text-gray-700 mb-2">{course.description}</p>
              </CardContent>
              <CardFooter className='flex justify-between items-center p-4 border-t rounded-b-lg'>
                <span className="inline-block uppercase bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {course.code}
                </span>
                <Link href={`/course?cid=${course.id}`}>
                  <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg my-6">No Courses Available</div>
      )}
    </div>

  )
}

export default ShowCourses