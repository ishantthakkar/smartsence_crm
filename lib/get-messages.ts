import type { MessageRecord } from '@/lib/messages';

export interface MessagesResponse {
  success: boolean;
  data: MessageRecord[];
  message?: string;
}

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:3000';

export async function getMessages(): Promise<MessagesResponse> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/messages`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    const contentType = response.headers.get('content-type') ?? '';

    if (!contentType.includes('application/json')) {
      const preview = (await response.text()).slice(0, 80);
      const isHtml = preview.trimStart().startsWith('<');
      return {
        success: false,
        data: [],
        message: isHtml
          ? `Backend not reachable at ${BACKEND_URL}. Start the API server (port 3000) and run the frontend on port 3001.`
          : 'API returned a non-JSON response',
      };
    }

    if (!response.ok) {
      return { success: false, data: [], message: 'Failed to load messages' };
    }

    const payload = (await response.json()) as MessagesResponse;
    return {
      success: Boolean(payload.success),
      data: Array.isArray(payload.data) ? payload.data : [],
      message: payload.message,
    };
  } catch {
    return {
      success: false,
      data: [],
      // message: `Could not connect to backend at ${BACKEND_URL}`,
    };
  }
}
