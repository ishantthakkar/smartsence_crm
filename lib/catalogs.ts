export interface CatalogCompany {
  name: string;
  address: string;
  website: string;
  email: string;
  phone: string;
}

export interface CatalogContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  website: string;
}

export interface CatalogProduct {
  name: string;
  sku: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  currency: string;
  imageUrls: string[];
}

export interface CatalogRecord {
  _id: string;
  originalFileName: string;
  mimeType?: string;
  sourceType?: 'pdf' | 'image' | 'excel';
  company: CatalogCompany;
  contacts: CatalogContact[];
  products: CatalogProduct[];
  extractedImageUrls: string[];
  status: 'pending' | 'draft' | 'scanned' | 'failed';
  errorMessage?: string;
  createdAt: string;
}

export { getCatalogs as fetchCatalogs } from '@/lib/get-catalogs';

export function formatCatalogDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleString();
}

