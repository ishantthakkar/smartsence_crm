'use server';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

export interface SubmitInquiryResult {
  success: boolean;
  inquiryId?: string;
  message?: string;
}

export async function submitInquiry(formData: FormData): Promise<SubmitInquiryResult> {
  const hasImportExperience = formData.get('hasImportExperience') === 'yes';

  try {
    const response = await fetch(`${BACKEND_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: formData.get('companyName'),
        contactPersonName: formData.get('contactPersonName'),
        contactNumber: formData.get('contactNumber'),
        whatsappOrWechat: formData.get('whatsappOrWechat'),
        email: formData.get('email'),
        cityState: formData.get('cityState'),
        tin: formData.get('tin'),
        businessType: formData.get('businessType'),
        hasImportExperience,
        currentSourceCountry: hasImportExperience ? formData.get('currentSourceCountry') : '',
        currentSellMarketCountry: hasImportExperience ? formData.get('currentSellMarketCountry') : '',
        preferredSellMarketCountry: hasImportExperience ? '' : formData.get('preferredSellMarketCountry'),
      }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      return {
        success: false,
        message: payload.message ?? 'Failed to submit inquiry',
      };
    }

    return {
      success: true,
      inquiryId: payload.data?.inquiryId,
      message: 'Inquiry submitted successfully',
    };
  } catch {
    return {
      success: false,
      message: 'Failed to submit inquiry. Please try again later.',
    };
  }
}
