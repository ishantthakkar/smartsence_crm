import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/get-messages';

export async function GET() {
  const payload = await getMessages();
  const status = payload.success ? 200 : 503;
  return NextResponse.json(payload, { status });
}
