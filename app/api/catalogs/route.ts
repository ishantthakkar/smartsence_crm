import { NextResponse } from 'next/server';
import { getCatalogs } from '@/lib/get-catalogs';

export async function GET() {
  const payload = await getCatalogs();
  const status = payload.success ? 200 : 503;
  return NextResponse.json(payload, { status });
}

