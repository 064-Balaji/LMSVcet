import React from "react";
import { prisma } from "@/prisma/prisma";
import Title from "./Title";
import Contents from "./Contents";

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
    <div className="flex flex-col mx-auto p-4 min-h-screen gap-4">
      <Title course={course} />
      <Contents courseId={course.id} />
    </div>
  );
};

export default CourseDetailPage;
