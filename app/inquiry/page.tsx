import { InquiryForm } from '@/components/inquiry-form';

export default function PublicInquiryPage() {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card card-outline card-primary shadow">
              <div className="card-header">
                <h1 className="card-title h3 mb-0">Buyer Inquiry Form</h1>
              </div>
              <div className="card-body">
                <p className="text-muted mb-4">
                  Share your company and import details. Our team will use this information for
                  CRM follow-up and repeat business support.
                </p>
                <p className="text-muted small mb-4">
                  <strong>Inquiry ID</strong> will be auto-generated after submission.
                </p>
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
