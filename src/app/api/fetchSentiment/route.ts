import { NextResponse } from "next/server";


interface LambdaResponse {
  message: number; // number of batches
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "";

  const lambdaUrl = process.env.LAMBDA_A_URL; 
  console.log("LAMBDA_A_URL=", lambdaUrl);
  if (!lambdaUrl) {
    console.error("LAMBDA_A_URL is not defined in environment variables!");
    return NextResponse.json({ error: "Missing LAMBDA_A_URL" }, { status: 500 });
  }

  try {
    const aResponse = await fetch(`${lambdaUrl}?keyword=${encodeURIComponent(keyword)}`);
    const aData = await aResponse.json();

    let numBatches = 0;
    if (typeof aData.message === "number") {
      numBatches = aData.message;
    } else if (typeof aData.message === "string") {
      const match = aData.message.match(/\d+/);
      numBatches = match ? parseInt(match[0], 10) : 0;
    }
    
    return NextResponse.json(
      {
      message: "Analysis scheduled, please check progress via WebSocket.",
      batches: numBatches, // only return the number of batches, actual analysis results will be sent via WebSocket
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Fetch error:", message);
    return NextResponse.json(
      { error: message }, 
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
