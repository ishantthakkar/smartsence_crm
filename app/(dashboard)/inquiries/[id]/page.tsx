import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatInquiryDate } from '@/lib/inquiries';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchInquiry(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/inquiries/${id}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload.success ? payload.data : null;
}

export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
  const { id } = await params;
  const inquiry = await fetchInquiry(id);

  if (!inquiry) {
    notFound();
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid my-2">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Inquiry: {inquiry.inquiryId}</h1>
            </div>
            <div className="col-sm-6 text-right">
              <Link href="/inquiries" className="btn btn-primary">
                Back to Inquiries
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Company & Contact</h3>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Company Name:</strong> {inquiry.companyName || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Contact Person:</strong> {inquiry.contactPersonName || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Contact Number:</strong> {inquiry.contactNumber || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>WhatsApp / WeChat:</strong> {inquiry.whatsappOrWechat || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {inquiry.email || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>City / State:</strong> {inquiry.cityState || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>TIN:</strong> {inquiry.tin || '-'}
                  </p>
                  <p className="mb-0">
                    <strong>Business Type:</strong> {inquiry.businessType || '-'}
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Import Experience</h3>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Existing import experience:</strong>{' '}
                    {inquiry.hasImportExperience ? 'Yes' : 'No'}
                  </p>
                  {inquiry.hasImportExperience ? (
                    <>
                      <p className="mb-1">
                        <strong>Current Source Country:</strong>{' '}
                        {inquiry.currentSourceCountry || '-'}
                      </p>
                      <p className="mb-0">
                        <strong>Current Sell / Market Country:</strong>{' '}
                        {inquiry.currentSellMarketCountry || '-'}
                      </p>
                    </>
                  ) : (
                    <p className="mb-0">
                      <strong>Preferred Country to Sell / Market:</strong>{' '}
                      {inquiry.preferredSellMarketCountry || '-'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Metadata</h3>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Inquiry ID:</strong> {inquiry.inquiryId}
                  </p>
                  <p className="mb-0">
                    <strong>Submitted:</strong> {formatInquiryDate(inquiry.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
