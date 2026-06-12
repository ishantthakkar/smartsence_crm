import Link from 'next/link';
import { formatInquiryDate, type InquiryRecord } from '@/lib/inquiries';

interface InquiriesTableProps {
  inquiries: InquiryRecord[];
}

export function InquiriesTable({ inquiries }: InquiriesTableProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Buyer Inquiries</h3>
        <div className="card-tools">
          <span className="badge badge-primary">{inquiries.length} total</span>
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-bordered table-striped table-hover mb-0">
          <thead className="thead-light">
            <tr>
              <th>Inquiry ID</th>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Business Type</th>
              <th>Import Exp.</th>
              <th>Submitted</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-muted py-5">
                  No inquiries yet. Share the public form at /inquiry
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry._id}>
                  <td>
                    <strong>{inquiry.inquiryId}</strong>
                  </td>
                  <td>{inquiry.companyName || '-'}</td>
                  <td>{inquiry.contactPersonName || '-'}</td>
                  <td>{inquiry.email || '-'}</td>
                  <td>{inquiry.businessType || '-'}</td>
                  <td>
                    <span className={`badge ${inquiry.hasImportExperience ? 'badge-success' : 'badge-secondary'}`}>
                      {inquiry.hasImportExperience ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>{formatInquiryDate(inquiry.createdAt)}</td>
                  <td>
                    <Link href={`/inquiries/${inquiry._id}`} className="btn btn-sm btn-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
