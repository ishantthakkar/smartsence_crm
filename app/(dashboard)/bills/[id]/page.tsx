import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatBillDate, formatCurrency } from '@/lib/bills';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:3000';

interface BillDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchBill(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/bills/${id}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload.success ? payload.data : null;
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { id } = await params;
  const bill = await fetchBill(id);

  if (!bill) {
    notFound();
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid my-2">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Bill: {bill.invoiceNumber || bill.originalFileName}</h1>
            </div>
            <div className="col-sm-6 text-right">
              <Link href="/bills" className="btn btn-primary">
                Back to Bills
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header pt-3">
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      <h2 className="h5 mb-3">Customer</h2>
                      <address>
                        <strong>{bill.customer?.name || '-'}</strong>
                        <br />
                        {bill.customer?.address || '-'}
                        <br />
                        {bill.customer?.phone ? (
                          <>
                            Phone: {bill.customer.phone}
                            <br />
                          </>
                        ) : null}
                        {bill.customer?.email ? (
                          <>Email: {bill.customer.email}</>
                        ) : null}
                      </address>
                    </div>
                    <div className="col-sm-4 invoice-col">
                      <b>Invoice #</b> {bill.invoiceNumber || '-'}
                      <br />
                      <br />
                      <b>Order ID:</b> {bill.orderId || '-'}
                      <br />
                      <b>Date:</b> {bill.date || '-'}
                      <br />
                      <b>Total:</b> {formatCurrency(bill.total, bill.currency)}
                      <br />
                      <b>Status:</b>{' '}
                      <span
                        className={
                          bill.status === 'scanned' ? 'text-success' : 'text-danger'
                        }
                      >
                        {bill.status}
                      </span>
                    </div>
                    <div className="col-sm-4 invoice-col">
                      <b>Source file:</b> {bill.originalFileName}
                      <br />
                      <b>Scanned:</b> {formatBillDate(bill.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive p-3">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th style={{ width: '100px' }}>Price</th>
                        <th style={{ width: '100px' }}>Qty</th>
                        <th style={{ width: '100px' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill.products?.length > 0 ? (
                        bill.products.map((product: {
                          name: string;
                          price: number;
                          quantity: number;
                          total: number;
                        }, index: number) => (
                          <tr key={`${product.name}-${index}`}>
                            <td>{product.name}</td>
                            <td>{formatCurrency(product.price, bill.currency)}</td>
                            <td>{product.quantity}</td>
                            <td>{formatCurrency(product.total, bill.currency)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            No products extracted
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="text-right">
                          <strong>Subtotal</strong>
                        </td>
                        <td>{formatCurrency(bill.subtotal, bill.currency)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-right">
                          <strong>Tax</strong>
                        </td>
                        <td>{formatCurrency(bill.tax, bill.currency)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="text-right">
                          <strong>Total</strong>
                        </td>
                        <td>
                          <strong>{formatCurrency(bill.total, bill.currency)}</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
