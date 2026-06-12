import Link from 'next/link';
import { MessagesTable } from '@/components/messages-table';
import { CatalogUploadButton } from '@/components/catalog-upload-button';
import { fetchMessages } from '@/lib/messages';

export default async function DashboardPage() {
  const { success, data: messages, message } = await fetchMessages();

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Dashboard</h1>
            </div>
            <div className="col-sm-6 text-right">
              <Link href="/catalogs" className="btn btn-outline-success btn-sm">
                <i className="fas fa-book mr-1" />
                View All Catalogs
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-outline card-success mb-4">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-robot mr-1" />
                Upload Catalog — PDF, Image, or Excel
              </h3>
            </div>
            <div className="card-body">
              <CatalogUploadButton />
            </div>
          </div>
          {!success && message ? (
            <div className="alert alert-warning" role="alert">
              {message}. Make sure the backend API is running.
            </div>
          ) : null}
          <MessagesTable messages={messages} />
        </div>
      </section>
    </>
  );
}
