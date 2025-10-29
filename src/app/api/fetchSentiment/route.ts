import { NextResponse } from "next/server";

const LAMBDA_A_URL = process.env.LAMBDA_A_URL!;

interface LambdaResponse {
  message: number; // number of batches
}

export async function GET(req: Request) {
   const url = new URL(req.url);
   const keyword = url.searchParams.get("keyword") || "";
  try {
    const aResponse = await fetch(`${LAMBDA_A_URL}?keyword=${encodeURIComponent(keyword)}`);
    const aData: LambdaResponse = await aResponse.json();
    return NextResponse.json({
      message: "Analysis scheduled, please check progress via WebSocket.",
      batches: aData.message, // only return the number of batches, actual analysis results will be sent via WebSocket
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
