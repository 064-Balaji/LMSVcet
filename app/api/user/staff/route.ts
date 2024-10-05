import { prisma } from "@/prisma/prisma";
import { Staff } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: Staff = await req.json();
  if (!body) return NextResponse.json("Fields required and must be valid");
  const {
    batchId,
    departmentId,
    isClassIncharge,
    isHoD,
    isMentor,
    password,
    sectionId,
    staffMail,
    staffName,
    staffPhone,
  } = body;

  const staff = await prisma.staff
    .create({
      data: {
        password,
        staffMail,
        staffName,
        batchId,
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
