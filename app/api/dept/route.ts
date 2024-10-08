import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const dept = await prisma.department.findMany().catch((e) => console.log(e));
  return NextResponse.json(dept, { status: 200 });
}
