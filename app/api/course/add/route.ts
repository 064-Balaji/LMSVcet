import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { Course } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const { batchId, code, departmentId, description, sectionId, title }: Course =
    await req.json();

  if (
    !batchId ||
    !code ||
    !departmentId ||
    !description ||
    !sectionId ||
    !title
  )
    return NextResponse.json("All the fields are required", { status: 401 });

  const course = await prisma.course
    .create({
      data: {
        code,
        description,
        departmentId,
        batchId,
        title,
        sectionId,
        staffId: session?.user.id!,
      },
    })
    .catch((e) => console.log(e));

  return NextResponse.json(course);
}
