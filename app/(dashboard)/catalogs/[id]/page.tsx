import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatCatalogDate } from '@/lib/catalogs';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

interface CatalogDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchCatalog(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/catalogs/${id}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload.success ? payload.data : null;
}

export default async function CatalogDetailPage({ params }: CatalogDetailPageProps) {
  const { id } = await params;
  const catalog = await fetchCatalog(id);

  if (!catalog) {
    notFound();
  }

  const isImage = catalog.sourceType === 'image' || catalog.mimeType?.startsWith('image/');
  const sourceLabel = catalog.sourceType === 'image'
    ? 'Visiting Card / Image'
    : catalog.sourceType === 'excel'
      ? 'Excel Sheet'
      : 'Catalog PDF';

  return (
    <>
      <section className="content-header">
        <div className="container-fluid my-2">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Catalog: {catalog.company?.name || catalog.originalFileName}</h1>
            </div>
            <div className="col-sm-6 text-right">
              <Link href="/catalogs" className="btn btn-primary">
                Back to Catalogs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h3 className="card-title mb-0">
                    <i className={`fas ${isImage ? 'fa-image' : 'fa-file-pdf'} mr-1 text-danger`} />
                    {sourceLabel}
                  </h3>
                  <a
                    href={`/api/catalogs/${id}/file`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Open in new tab
                  </a>
                </div>
                <div className="card-body p-0">
                  {isImage ? (
                    <img
                      src={`/api/catalogs/${id}/file`}
                      alt={catalog.originalFileName || 'Catalog image'}
                      style={{ width: '100%', maxHeight: '720px', objectFit: 'contain' }}
                    />
                  ) : (
                    <iframe
                      src={`/api/catalogs/${id}/file`}
                      title={catalog.originalFileName || sourceLabel}
                      style={{ width: '100%', height: '720px', border: 'none' }}
                    />
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Company</h3>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Name:</strong> {catalog.company?.name || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Website:</strong> {catalog.company?.website || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {catalog.company?.email || '-'}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {catalog.company?.phone || '-'}
                  </p>
                  <p className="mb-0">
                    <strong>Address:</strong> {catalog.company?.address || '-'}
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Products</h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th style={{ width: '140px' }}>SKU</th>
                        <th>Description</th>
                        <th style={{ width: '120px' }}>Category</th>
                        <th style={{ width: '160px' }}>Tags</th>
                        <th style={{ width: '120px' }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalog.products?.length ? (
                        catalog.products.map(
                          (
                            product: {
                              name: string;
                              sku: string;
                              description: string;
                              category: string;
                              tags?: string[];
                              price: number;
                              currency: string;
                            },
                            index: number,
                          ) => (
                            <tr key={`${product.sku || product.name}-${index}`}>
                              <td>{product.name || '-'}</td>
                              <td>{product.sku || '-'}</td>
                              <td style={{ maxWidth: '520px', whiteSpace: 'normal' }}>
                                {product.description || '-'}
                              </td>
                              <td>{product.category || '-'}</td>
                              <td>
                                {product.tags?.length ? (
                                  product.tags.map((tag) => (
                                    <span key={tag} className="badge badge-info mr-1">
                                      {tag}
                                    </span>
                                  ))
                                ) : (
                                  '-'
                                )}
                              </td>
                              <td>
                                {product.price ? `${product.currency || '$'}${product.price}` : '-'}
                              </td>
                            </tr>
                          ),
                        )
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-muted py-4">
                            No products extracted
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Image links</h3>
                </div>
                <div className="card-body">
                  {catalog.extractedImageUrls?.length ? (
                    <ul className="mb-0">
                      {catalog.extractedImageUrls.slice(0, 50).map((url: string) => (
                        <li key={url} style={{ wordBreak: 'break-word' }}>
                          <a href={url} target="_blank" rel="noreferrer">
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted mb-0">No image URLs found in this PDF.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Metadata</h3>
                </div>
                <div className="card-body">
                  <p className="mb-1">
                    <strong>Source file:</strong> {catalog.originalFileName}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> {catalog.status}
                  </p>
                  <p className="mb-0">
                    <strong>Scanned:</strong> {formatCatalogDate(catalog.createdAt)}
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

