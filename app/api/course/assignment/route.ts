import { prisma } from "@/prisma/prisma";
import { Assignment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, docs, dueDate, courseId, referLink, title }: Assignment =
    await req.json();

  if (!description || !title || !courseId)
    return NextResponse.json("Please fill neccessary fields", { status: 401 });

  const newAssignment = await prisma.assignment
    .create({
      data: {
        courseId,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        docs,
        referLink,
      },
    })
    .catch((e) => console.log(e));

  return NextResponse.json(newAssignment, { status: 201 });
}
