'use client';

import { useState } from 'react';
import { submitInquiry } from '@/app/inquiry/actions';

const CERTIFICATION_OPTIONS = ['CE', 'RoHS', 'BIS', 'FCC', 'FDA', 'ISO', 'IEC', 'Other'] as const;

interface BuyerInfo {
  companyName: string;
  contactPersonName: string;
  contactNumber: string;
  whatsappOrWechat: string;
  email: string;
  cityState: string;
  tin: string;
  businessType: string;
  hasImportExperience: 'yes' | 'no';
  currentSourceCountry: string;
  currentSellMarketCountry: string;
  preferredSellMarketCountry: string;
}

const emptyBuyerInfo: BuyerInfo = {
  companyName: '',
  contactPersonName: '',
  contactNumber: '',
  whatsappOrWechat: '',
  email: '',
  cityState: '',
  tin: '',
  businessType: '',
  hasImportExperience: 'no',
  currentSourceCountry: '',
  currentSellMarketCountry: '',
  preferredSellMarketCountry: '',
};

export function InquiryForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>(emptyBuyerInfo);
  const [productBrandingRequired, setProductBrandingRequired] = useState<'yes' | 'no'>('no');
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState('');

  function toggleCert(cert: string) {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((item) => item !== cert) : [...prev, cert],
    );
  }

  function handleBuyerChange(field: keyof BuyerInfo, value: string) {
    setBuyerInfo((prev) => ({ ...prev, [field]: value }));
  }

  function handleNext(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setError('');
    setStep(2);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setError('');

    const formData = new FormData(form);
    Object.entries(buyerInfo).forEach(([key, value]) => formData.set(key, value));
    formData.set('productBrandingRequired', productBrandingRequired);
    selectedCerts.forEach((cert) => formData.set(`cert_${cert}`, 'on'));

    const result = await submitInquiry(formData);

    if (!result.success) {
      setError(result.message ?? 'Failed to submit inquiry');
      setIsSubmitting(false);
      return;
    }

    setSubmittedId(result.inquiryId ?? '');
    setStep(1);
    setBuyerInfo(emptyBuyerInfo);
    setProductBrandingRequired('no');
    setSelectedCerts([]);
    setIsSubmitting(false);
  }

  if (submittedId) {
    return (
      <div className="alert alert-success">
        <h4 className="alert-heading">Thank you!</h4>
        <p className="mb-2">Your inquiry has been submitted successfully.</p>
        <p className="mb-0">
          <strong>Inquiry ID:</strong> {submittedId}
        </p>
        <button
          type="button"
          className="btn btn-outline-success mt-3"
          onClick={() => setSubmittedId('')}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={step === 1 ? 'font-weight-bold text-primary' : 'text-muted'}>
            Step 1: Buyer Information
          </span>
          <span className={step === 2 ? 'font-weight-bold text-primary' : 'text-muted'}>
            Step 2: Product Details
          </span>
        </div>
        <div className="progress" style={{ height: '8px' }}>
          <div
            className="progress-bar bg-primary"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNext}>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Company Name *</label>
              <input
                name="companyName"
                className="form-control"
                required
                value={buyerInfo.companyName}
                onChange={(e) => handleBuyerChange('companyName', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Contact Person Name *</label>
              <input
                name="contactPersonName"
                className="form-control"
                required
                value={buyerInfo.contactPersonName}
                onChange={(e) => handleBuyerChange('contactPersonName', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Contact Number</label>
              <input
                name="contactNumber"
                className="form-control"
                value={buyerInfo.contactNumber}
                onChange={(e) => handleBuyerChange('contactNumber', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>WhatsApp Number / WeChat ID</label>
              <input
                name="whatsappOrWechat"
                className="form-control"
                value={buyerInfo.whatsappOrWechat}
                onChange={(e) => handleBuyerChange('whatsappOrWechat', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={buyerInfo.email}
                onChange={(e) => handleBuyerChange('email', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>City / State</label>
              <input
                name="cityState"
                className="form-control"
                value={buyerInfo.cityState}
                onChange={(e) => handleBuyerChange('cityState', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>TIN (Taxpayer Identification Number)</label>
              <input
                name="tin"
                className="form-control"
                value={buyerInfo.tin}
                onChange={(e) => handleBuyerChange('tin', e.target.value)}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Business Type</label>
              <input
                name="businessType"
                className="form-control"
                placeholder="e.g. Retailer, Distributor, Wholesaler"
                value={buyerInfo.businessType}
                onChange={(e) => handleBuyerChange('businessType', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Existing import experience</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="import-yes"
                  checked={buyerInfo.hasImportExperience === 'yes'}
                  onChange={() => handleBuyerChange('hasImportExperience', 'yes')}
                />
                <label className="form-check-label" htmlFor="import-yes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="import-no"
                  checked={buyerInfo.hasImportExperience === 'no'}
                  onChange={() => handleBuyerChange('hasImportExperience', 'no')}
                />
                <label className="form-check-label" htmlFor="import-no">
                  No
                </label>
              </div>
            </div>
          </div>

          {buyerInfo.hasImportExperience === 'yes' ? (
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Current Source Country</label>
                <input
                  name="currentSourceCountry"
                  className="form-control"
                  value={buyerInfo.currentSourceCountry}
                  onChange={(e) => handleBuyerChange('currentSourceCountry', e.target.value)}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Current Sell / Market Country</label>
                <input
                  name="currentSellMarketCountry"
                  className="form-control"
                  value={buyerInfo.currentSellMarketCountry}
                  onChange={(e) => handleBuyerChange('currentSellMarketCountry', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label>Preferred Country to Sell / Market</label>
              <input
                name="preferredSellMarketCountry"
                className="form-control"
                value={buyerInfo.preferredSellMarketCountry}
                onChange={(e) => handleBuyerChange('preferredSellMarketCountry', e.target.value)}
              />
            </div>
          )}

          {error ? <div className="alert alert-danger">{error}</div> : null}

          <button type="submit" className="btn btn-primary btn-lg">
            Next: Product Details
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Product Name *</label>
              <input name="productName" className="form-control" required />
            </div>
            <div className="col-md-6 form-group">
              <label>Product Category *</label>
              <input name="productCategory" className="form-control" required />
            </div>
            <div className="col-md-12 form-group">
              <label>Product Link (Amazon, Flipkart, etc.)</label>
              <input
                name="productLink"
                type="url"
                className="form-control"
                placeholder="https://"
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Product Description *</label>
              <textarea name="productDescription" className="form-control" rows={3} required />
            </div>
            <div className="col-md-12 form-group">
              <label>Product Specifications</label>
              <textarea name="productSpecifications" className="form-control" rows={3} />
            </div>
            <div className="col-md-6 form-group">
              <label>Trial / Sample Quantity</label>
              <input name="trialSampleQuantity" className="form-control" />
            </div>
            <div className="col-md-6 form-group">
              <label>Monthly / Yearly Quantity</label>
              <input name="monthlyYearlyQuantity" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Product Branding Requirements</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="branding-yes"
                  checked={productBrandingRequired === 'yes'}
                  onChange={() => setProductBrandingRequired('yes')}
                />
                <label className="form-check-label" htmlFor="branding-yes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="branding-no"
                  checked={productBrandingRequired === 'no'}
                  onChange={() => setProductBrandingRequired('no')}
                />
                <label className="form-check-label" htmlFor="branding-no">
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Certifications Needed</label>
            <div className="d-flex flex-wrap">
              {CERTIFICATION_OPTIONS.map((cert) => (
                <div key={cert} className="form-check mr-3 mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`cert-${cert}`}
                    checked={selectedCerts.includes(cert)}
                    onChange={() => toggleCert(cert)}
                  />
                  <label className="form-check-label" htmlFor={`cert-${cert}`}>
                    {cert}
                  </label>
                </div>
              ))}
            </div>
            {selectedCerts.includes('Other') ? (
              <input
                name="certificationsOther"
                className="form-control mt-2"
                placeholder="Specify other certification"
              />
            ) : (
              <input type="hidden" name="certificationsOther" value="" />
            )}
          </div>

          <div className="form-group">
            <label>Shipment Preferences</label>
            <textarea
              name="shipmentPreferences"
              className="form-control"
              rows={2}
              placeholder="e.g. Air freight, sea freight, EXW, FOB"
            />
          </div>

          {error ? <div className="alert alert-danger">{error}</div> : null}

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
