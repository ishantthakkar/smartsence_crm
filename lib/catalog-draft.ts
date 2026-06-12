import type { CatalogCompany, CatalogContact, CatalogProduct } from '@/lib/catalogs';

export interface CatalogDraft {
  _id: string;
  originalFileName: string;
  mimeType?: string;
  sourceType?: 'pdf' | 'image' | 'excel';
  matchedCatalogId?: string;
  matchedCatalog?: {
    _id: string;
    company?: CatalogCompany;
  };
  company: CatalogCompany;
  contacts: CatalogContact[];
  products: CatalogProduct[];
  extractedImageUrls: string[];
  status: string;
}

export function createEmptyContact(): CatalogContact {
  return { name: '', role: '', email: '', phone: '', website: '' };
}

export function createEmptyProduct(): CatalogProduct {
  return {
    name: '',
    sku: '',
    description: '',
    category: '',
    tags: [],
    price: 0,
    currency: '',
    imageUrls: [],
  };
}
