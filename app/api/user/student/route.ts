import { prisma } from "@/prisma/prisma";
import { Student } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  const body: Student = await req.json();
  if (!body) return NextResponse.json("Fields are required", { status: 401 });
  const {
    batchId,
    departmentId,
    email,
    name,
    password,
    phone,
    registerNo,
    rollNo,
    sectionId,
  } = body;

  const hashedPass = await bcryptjs.hash(password, 10);

  const user = await prisma.student
    .create({
      data: {
        batchId,
        email,
        name,
        departmentId,
        password: hashedPass,
        phone,
        registerNo,
        rollNo,
        sectionId,
      },
    })
    .catch((e) => console.log("error while creating user", e));

  return NextResponse.json(user);
}
