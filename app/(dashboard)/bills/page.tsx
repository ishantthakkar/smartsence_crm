import { BillsTable } from '@/components/bills-table';
import { PdfUploadButton } from '@/components/pdf-upload-button';
import { fetchBills } from '@/lib/bills';

export default async function BillsPage() {
  const { success, data: bills, message } = await fetchBills();

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Bill Scanner</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          {!success && message ? (
            <div className="alert alert-warning" role="alert">
              {message}. Make sure the backend API is running and GEMINI_API_KEY is set.
            </div>
          ) : null}
          <div className="card card-outline card-success mb-4">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-robot mr-1" />
                Upload PDF — Gemini AI Scan
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Upload a bill or invoice PDF. Gemini AI will extract customer info, product
                details, and totals, then save them to the database.
              </p>
              <PdfUploadButton />
            </div>
          </div>
          <BillsTable bills={bills} />
        </div>
      </section>
    </>
  );
}
