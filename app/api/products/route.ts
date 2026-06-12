import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/get-products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag') ?? undefined;
  const payload = await getProducts(tag ?? undefined);
  const status = payload.success ? 200 : 503;
  return NextResponse.json(payload, { status });
}
