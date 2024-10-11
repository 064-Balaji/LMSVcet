import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: "Fields required and must be valid" },
        { status: 400 }
      );
    }
    if (body.fromDate) {body.fromDate = new Date(body.fromDate);}
    if (body.toDate) {body.toDate = new Date(body.toDate);}
    const existingLeave = await prisma.leave.findMany({
      where: {
        id:body.id,
        OR: [
          {
            fromDate: {lte: body.toDate,},
            toDate: {gte: body.fromDate,},
          },
          {
            fromDate: {gte: body.fromDate,},
            toDate: {lte: body.toDate,},
          },
        ],
      },
    });

    if (existingLeave.length > 0) {
      return NextResponse.json(
        { message: "Leave already exists for that day." },
        { status: 409 } 
      );
    }
    const leave = await prisma.leave.create({ data: body });
    return NextResponse.json(leave, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while creating the leave entry." },
      { status: 500 }
    );
  }
}
