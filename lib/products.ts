export interface ProductRecord {
  _id: string;
  catalogId: string;
  companyName: string;
  catalogFileName: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  currency: string;
  imageUrls: string[];
  createdAt: string;
}

export const SUGGESTED_PRODUCT_TAGS = [
  'light',
  'laptop',
  'mobile',
  'tablet',
  'monitor',
  'sensor',
  'cable',
  'accessory',
  'router',
  'printer',
] as const;

export { getProducts as fetchProducts } from '@/lib/get-products';
