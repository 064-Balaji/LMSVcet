import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const dept = url.searchParams.get("dept");
  if (!dept) return NextResponse.json(["Choose Dept First"]);
  return NextResponse.json(["Hello", "well"]);
}
