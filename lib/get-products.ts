import type { ProductRecord } from '@/lib/products';

export interface ProductsResponse {
  success: boolean;
  data: ProductRecord[];
  message?: string;
}

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

export async function getProducts(tag?: string): Promise<ProductsResponse> {
  try {
    const query = tag ? `?tag=${encodeURIComponent(tag)}` : '';
    const response = await fetch(`${BACKEND_URL}/api/products${query}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      return { success: false, data: [], message: 'Failed to load products' };
    }

    const payload = (await response.json()) as ProductsResponse;
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
