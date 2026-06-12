import Link from 'next/link';
import { formatCatalogDate, type CatalogRecord } from '@/lib/catalogs';

interface CatalogsTableProps {
  catalogs: CatalogRecord[];
}

function statusBadge(status: CatalogRecord['status']) {
  if (status === 'scanned') {
    return <span className="badge badge-success">Scanned</span>;
  }
  if (status === 'failed') {
    return <span className="badge badge-danger">Failed</span>;
  }
  return <span className="badge badge-warning">Pending</span>;
}

export function CatalogsTable({ catalogs }: CatalogsTableProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Scanned Catalogs</h3>
        <div className="card-tools">
          <span className="badge badge-primary">{catalogs.length} total</span>
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table className="table table-bordered table-striped table-hover mb-0">
          <thead className="thead-light">
            <tr>
              <th style={{ width: '60px' }}>#</th>
              <th>File</th>
              <th>Company</th>
              <th>Contacts</th>
              <th>Products</th>
              <th style={{ width: '120px' }}>Images</th>
              <th style={{ width: '90px' }}>Status</th>
              <th style={{ width: '160px' }}>Scanned</th>
              <th style={{ width: '80px' }} />
            </tr>
          </thead>
          <tbody>
            {catalogs.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-5">
                  No catalogs scanned yet. Upload a PDF to get started.
                </td>
              </tr>
            ) : (
              catalogs.map((catalog, index) => (
                <tr key={catalog._id}>
                  <td>{index + 1}</td>
                  <td style={{ maxWidth: '180px', wordBreak: 'break-word' }}>
                    {catalog.originalFileName || '-'}
                  </td>
                  <td>
                    <strong>{catalog.company?.name || '-'}</strong>
                    {catalog.company?.website ? (
                      <div className="text-muted small">{catalog.company.website}</div>
                    ) : null}
                  </td>
                  <td>
                    {catalog.contacts?.length ? (
                      <span className="badge badge-info">
                        {catalog.contacts.length} contact
                        {catalog.contacts.length === 1 ? '' : 's'}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {catalog.products?.length ? (
                      <span className="badge badge-info">
                        {catalog.products.length} product
                        {catalog.products.length === 1 ? '' : 's'}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {catalog.extractedImageUrls?.length ? (
                      <span className="badge badge-secondary">
                        {catalog.extractedImageUrls.length} link
                        {catalog.extractedImageUrls.length === 1 ? '' : 's'}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{statusBadge(catalog.status)}</td>
                  <td>{formatCatalogDate(catalog.createdAt)}</td>
                  <td>
                    <Link
                      href={`/catalogs/${catalog._id}`}
                      className="btn btn-sm btn-primary"
                    >
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

