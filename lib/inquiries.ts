export interface InquiryRecord {
  _id: string;
  inquiryId: string;
  companyName: string;
  contactPersonName: string;
  contactNumber: string;
  whatsappOrWechat: string;
  email: string;
  cityState: string;
  tin: string;
  businessType: string;
  hasImportExperience: boolean;
  currentSourceCountry: string;
  currentSellMarketCountry: string;
  preferredSellMarketCountry: string;
  productName: string;
  productCategory: string;
  productLink: string;
  productDescription: string;
  productSpecifications: string;
  trialSampleQuantity: string;
  monthlyYearlyQuantity: string;
  productBrandingRequired: boolean;
  certificationsNeeded: string[];
  certificationsOther: string;
  shipmentPreferences: string;
  createdAt: string;
}

export { getInquiries as fetchInquiries } from '@/lib/get-inquiries';

export function formatInquiryDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleString();
}
