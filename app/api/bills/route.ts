import { NextResponse } from 'next/server';
import { getBills } from '@/lib/get-bills';

export async function GET() {
  const payload = await getBills();
  const status = payload.success ? 200 : 503;
  return NextResponse.json(payload, { status });
}
