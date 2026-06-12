import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/api/catalogs/${id}/file`, {
      cache: 'no-store',
    });

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { success: false, message: 'File not found' },
        { status: response.status || 404 },
      );
    }

    const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
    const contentDisposition = response.headers.get('content-disposition');

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        ...(contentDisposition ? { 'Content-Disposition': contentDisposition } : {}),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to load file' },
      { status: 500 },
    );
  }
}
