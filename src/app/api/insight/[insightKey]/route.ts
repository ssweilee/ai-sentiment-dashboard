import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const s3 = new S3Client({ region: "us-east-1" });
const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

// convert S3 stream to string
async function streamToString(stream: Readable | null): Promise<string> {
  if (!stream) return "";
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk as Uint8Array);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ insightKey: string }> } 
) {
  const { insightKey } = await context.params; 
  const s3Key = `insights/${insightKey}`;

  try {
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: s3Key });
    const response = await s3.send(command);

    if (!response.Body) {
      return NextResponse.json(
        { error: "S3 object has no content" },
        { status: 404 }
      );
    }

    const bodyString = await streamToString(response.Body as Readable);
    const body = JSON.parse(bodyString);

    return NextResponse.json(body);
  } catch (err) {
    console.error("S3 GET error:", err);
    return NextResponse.json(
      { error: "Not found or failed to fetch" },
      { status: 404 }
    );
  }
}