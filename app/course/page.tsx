import React from "react";
import { prisma } from "@/prisma/prisma";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, User, CalendarDays, ClipboardList } from "lucide-react";

const CourseDetailPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams?.cid)
    return <p className="text-center text-red-500">Course ID is required</p>;

  const id = String(searchParams.cid);
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      staff: true,
      department: true,
      batch: true,
      section: true,
    },
  });

  if (!course)
    return <p className="text-center text-red-500">Course not found</p>;

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary" className="text-lg">
              {course.code}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {course.department.deptName}
            </Badge>
          </div>
          <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
          <CardDescription className="text-base">
            {course.description || "No description available."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Instructor:</span>
              {/* <Avatar className="h-6 w-6">
                <AvatarImage src={""} alt={course.staff.staffName} />
                <AvatarFallback>
                  {course.staff.staffName.charAt(0)}
                </AvatarFallback>
              </Avatar> */}
              <span>{course.staff.staffName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Batch:</span>
              <span>{course.batch.batchName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Section:</span>
              <span>{course.section.sectionName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailPage;
