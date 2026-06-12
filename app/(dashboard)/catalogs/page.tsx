import { CatalogUploadButton } from '@/components/catalog-upload-button';
import { CatalogsTable } from '@/components/catalogs-table';
import { fetchCatalogs } from '@/lib/catalogs';

export default async function CatalogsPage() {
  const { success, data: catalogs, message } = await fetchCatalogs();

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Catalog Scanner</h1>
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
                Upload — PDF, Image, or Excel
              </h3>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                Upload a catalog PDF, visiting card image, or Excel sheet. Gemini AI extracts the
                data. Visiting cards are matched to existing companies when possible.
              </p>
              <CatalogUploadButton />
            </div>
          </div>

          <CatalogsTable catalogs={catalogs} />
        </div>
      </section>
    </>
  );
}

