import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const response = await fetch(`${BACKEND_URL}/api/catalogs/${id}/draft`, {
      method: 'DELETE',
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to discard draft' },
      { status: 500 },
    );
  }
}
