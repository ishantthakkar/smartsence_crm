import type { InquiryRecord } from '@/lib/inquiries';

export interface InquiriesResponse {
  success: boolean;
  data: InquiryRecord[];
  message?: string;
}

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

export async function getInquiries(): Promise<InquiriesResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/inquiries`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { success: false, data: [], message: 'Failed to load inquiries' };
    }

    const payload = (await response.json()) as InquiriesResponse;
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
