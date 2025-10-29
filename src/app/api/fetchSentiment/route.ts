import { NextResponse } from "next/server";


interface LambdaResponse {
  message: number; // number of batches
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";

  const lambdaUrl = process.env.LAMBDA_A_URL; 
  if (!lambdaUrl) {
    console.error("❌ LAMBDA_A_URL is not defined in environment variables!");
    return NextResponse.json({ error: "Missing LAMBDA_A_URL" }, { status: 500 });
  }

  try {
    const aResponse = await fetch(`${lambdaUrl}?keyword=${encodeURIComponent(keyword)}`);
    const aData: { message: number } = await aResponse.json();
    return NextResponse.json({
      message: "Analysis scheduled, please check progress via WebSocket.",
      batches: aData.message, // only return the number of batches, actual analysis results will be sent via WebSocket
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Fetch error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
