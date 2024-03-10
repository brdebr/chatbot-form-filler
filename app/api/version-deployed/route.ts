import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(process.env.SOURCE_COMMIT || 'IN DEV', {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}