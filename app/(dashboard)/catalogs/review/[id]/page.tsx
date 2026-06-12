import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { CatalogReviewForm } from '@/components/catalog-review-form';
import type { CatalogDraft } from '@/lib/catalog-draft';

const BACKEND_URL = process.env.API_URL ?? 'http://127.0.0.1:5000';

interface CatalogReviewPageProps {
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

export default async function CatalogReviewPage({ params }: CatalogReviewPageProps) {
  const { id } = await params;
  const catalog = await fetchCatalog(id);

  if (!catalog) {
    notFound();
  }

  if (catalog.status === 'scanned') {
    redirect(`/catalogs/${id}`);
  }

  if (catalog.status !== 'draft') {
    notFound();
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid my-2">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Review Catalog</h1>
            </div>
            <div className="col-sm-6 text-right">
              <Link href="/catalogs" className="btn btn-default">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <CatalogReviewForm catalog={catalog as CatalogDraft} />
        </div>
      </section>
    </>
  );
}
