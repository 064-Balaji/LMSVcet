import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const batch = url.searchParams.get("batch");
  const dept = url.searchParams.get("dept");
  console.log(batch, dept);
  if (!batch || !dept)
    return NextResponse.json(["Batch & Department is Required"]);
  const section = await prisma.section.findMany({
    where: { batchId: batch, deptId: dept },
  });
  return NextResponse.json(section);
}
