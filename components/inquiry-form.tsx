'use client';

import { useState } from 'react';
import { submitInquiry } from '@/app/inquiry/actions';

export function InquiryForm() {
  const [hasImportExperience, setHasImportExperience] = useState<'yes' | 'no'>('no');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    formData.set('hasImportExperience', hasImportExperience);

    const result = await submitInquiry(formData);

    if (!result.success) {
      setError(result.message ?? 'Failed to submit inquiry');
      setIsSubmitting(false);
      return;
    }

    setSubmittedId(result.inquiryId ?? '');
    setHasImportExperience('no');
    setFormKey((key) => key + 1);
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
    <form key={formKey} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 form-group">
          <label>Company Name *</label>
          <input name="companyName" className="form-control" required />
        </div>
        <div className="col-md-6 form-group">
          <label>Contact Person Name *</label>
          <input name="contactPersonName" className="form-control" required />
        </div>
        <div className="col-md-6 form-group">
          <label>Contact Number</label>
          <input name="contactNumber" className="form-control" />
        </div>
        <div className="col-md-6 form-group">
          <label>WhatsApp Number / WeChat ID</label>
          <input name="whatsappOrWechat" className="form-control" />
        </div>
        <div className="col-md-6 form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" />
        </div>
        <div className="col-md-6 form-group">
          <label>City / State</label>
          <input name="cityState" className="form-control" />
        </div>
        <div className="col-md-6 form-group">
          <label>TIN (Taxpayer Identification Number)</label>
          <input name="tin" className="form-control" />
        </div>
        <div className="col-md-6 form-group">
          <label>Business Type</label>
          <input
            name="businessType"
            className="form-control"
            placeholder="e.g. Retailer, Distributor, Wholesaler"
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
              checked={hasImportExperience === 'yes'}
              onChange={() => setHasImportExperience('yes')}
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
              checked={hasImportExperience === 'no'}
              onChange={() => setHasImportExperience('no')}
            />
            <label className="form-check-label" htmlFor="import-no">
              No
            </label>
          </div>
        </div>
      </div>

      {hasImportExperience === 'yes' ? (
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Current Source Country</label>
            <input name="currentSourceCountry" className="form-control" />
          </div>
          <div className="col-md-6 form-group">
            <label>Current Sell / Market Country</label>
            <input name="currentSellMarketCountry" className="form-control" />
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label>Preferred Country to Sell / Market</label>
          <input name="preferredSellMarketCountry" className="form-control" />
        </div>
      )}

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
