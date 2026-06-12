import type { BillRecord } from '@/lib/bills';

export interface BillsResponse {
  success: boolean;
  data: BillRecord[];
  message?: string;
}

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:3000';

export async function getBills(): Promise<BillsResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/bills`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    const contentType = response.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
      return {
        success: false,
        data: [],
        message: `Backend not reachable at ${BACKEND_URL}`,
      };
    }

    if (!response.ok) {
      return { success: false, data: [], message: 'Failed to load bills' };
    }

    const payload = (await response.json()) as BillsResponse;
    return {
      success: Boolean(payload.success),
      data: Array.isArray(payload.data) ? payload.data : [],
      message: payload.message,
    };
  } catch {
    return {
      success: false,
      data: [],
      message: `Could not connect to backend at ${BACKEND_URL}`,
    };
  }
}
