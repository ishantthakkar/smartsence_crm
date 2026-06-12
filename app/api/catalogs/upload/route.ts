import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await fetch(`${BACKEND_URL}/api/catalogs/upload`, {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        {
          success: false,
          message: `Backend not reachable at ${BACKEND_URL}`,
        },
        { status: 503 },
      );
    }

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Upload failed. Check that the backend API is running. Max PDF size is 50MB.',
      },
      { status: 500 },
    );
  }
}

