import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const env = process.env;
  return NextResponse.json(env);
}