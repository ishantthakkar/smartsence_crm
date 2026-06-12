import Link from 'next/link';
import {
  formatBillDate,
  formatCurrency,
  type BillRecord,
} from '@/lib/bills';

interface BillsTableProps {
  bills: BillRecord[];
}

function statusBadge(status: BillRecord['status']) {
  if (status === 'scanned') {
    return <span className="badge badge-success">Scanned</span>;
  }
  if (status === 'failed') {
    return <span className="badge badge-danger">Failed</span>;
  }
  return <span className="badge badge-warning">Pending</span>;
}

export function BillsTable({ bills }: BillsTableProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Scanned Bills</h3>
        <div className="card-tools">
          <span className="badge badge-primary">{bills.length} total</span>
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-bordered table-striped table-hover mb-0">
          <thead className="thead-light">
            <tr>
              <th style={{ width: '60px' }}>#</th>
              <th>File</th>
              <th>Customer</th>
              <th>Invoice #</th>
              <th>Products</th>
              <th style={{ width: '100px' }}>Total</th>
              <th style={{ width: '90px' }}>Status</th>
              <th style={{ width: '160px' }}>Scanned</th>
              <th style={{ width: '80px' }} />
            </tr>
          </thead>
          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-5">
                  No bills scanned yet. Upload a PDF to get started.
                </td>
              </tr>
            ) : (
              bills.map((bill, index) => (
                <tr key={bill._id}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '160px', wordBreak: 'break-word' }}>
                    {bill.originalFileName || '-'}
                  </td>
                  <td>
                    <strong>{bill.customer?.name || '-'}</strong>
                    {bill.customer?.email ? (
                      <div className="text-muted small">{bill.customer.email}</div>
                    ) : null}
                    {bill.customer?.phone ? (
                      <div className="text-muted small">{bill.customer.phone}</div>
                    ) : null}
                  </td>
                  <td>{bill.invoiceNumber || '-'}</td>
                  <td>
                    {bill.products?.length > 0 ? (
                      <span className="badge badge-info">
                        {bill.products.length} item{bill.products.length === 1 ? '' : 's'}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{formatCurrency(bill.total, bill.currency)}</td>
                  <td>{statusBadge(bill.status)}</td>
                  <td>{formatBillDate(bill.createdAt)}</td>
                  <td>
                    <Link href={`/bills/${bill._id}`} className="btn btn-sm btn-primary">
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
