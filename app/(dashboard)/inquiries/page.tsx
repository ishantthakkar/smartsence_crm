import Link from 'next/link';
import { InquiriesTable } from '@/components/inquiries-table';
import { fetchInquiries } from '@/lib/inquiries';

export default async function InquiriesPage() {
  const { success, data: inquiries, message } = await fetchInquiries();

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Buyer Inquiries</h1>
            </div>
            <div className="col-sm-6 text-right">
              <a
                href="/inquiry"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success btn-sm"
              >
                <i className="fas fa-external-link-alt mr-1" />
                Open Public Form
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          {!success && message ? (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          ) : null}
          <div className="alert alert-info">
            Public inquiry form URL:{' '}
            <Link href="/inquiry" target="_blank">
              /inquiry
            </Link>
          </div>
          <InquiriesTable inquiries={inquiries} />
        </div>
      </section>
    </>
  );
}
