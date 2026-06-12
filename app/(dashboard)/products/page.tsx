import Link from 'next/link';
import { ProductsTable } from '@/components/products-table';
import { fetchProducts } from '@/lib/products';

interface ProductsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { tag } = await searchParams;
  const { success, data: products, message } = await fetchProducts(tag);

  return (
    <>
      <section className="content-header">
        <div className="container-fluid my-2">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Products</h1>
            </div>
            <div className="col-sm-6 text-right">
              <Link href="/catalogs" className="btn btn-success btn-sm">
                <i className="fas fa-file-upload mr-1" />
                Upload Catalog
              </Link>
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
          <ProductsTable products={products} activeTag={tag} />
        </div>
      </section>
    </>
  );
}
