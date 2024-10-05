import { prisma } from "@/prisma/prisma";
import { Staff } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  const body: Staff = await req.json();
  if (!body) return NextResponse.json("Fields required and must be valid");
  const {
    departmentId,
    isClassIncharge,
    isHoD,
    isMentor,
    password,
    sectionId,
    email,
    staffName,
    staffPhone,
  } = body;

  const hashedPass = await bcryptjs.hash(password, 10);

  const staff = await prisma.staff
    .create({
      data: {
        password: hashedPass,
        email,
        staffName,
        departmentId,
        isClassIncharge,
        isHoD,
        isMentor,
        sectionId,
        staffPhone,
      },
    })
    .catch((e) => console.log(e));

  return NextResponse.json(staff);
}
