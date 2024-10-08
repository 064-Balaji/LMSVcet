import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const dept = url.searchParams.get("dept");
  if (!dept) return NextResponse.json(["Choose Dept First"]);
  const batch = await prisma.batch.findMany().catch((e) => console.log(e));
  return NextResponse.json(batch, { status: 200 });
}
