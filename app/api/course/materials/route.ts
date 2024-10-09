import { prisma } from "@/prisma/prisma";
import { Materials } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    data: { title, description, docs },
    courseId,
  }: { data: Materials; courseId: string } = await req.json();

  if (!title || !docs || !courseId)
    return NextResponse.json("Title and Responses are required", {
      status: 403,
    });

  const material = await prisma.materials
    .create({
      data: { title, description, docs, courseId },
    })
    .catch((e) => console.log(e));

  return NextResponse.json(material);
}
