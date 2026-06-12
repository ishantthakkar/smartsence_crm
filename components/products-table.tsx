import { ProductTagsEditor } from '@/components/product-tags-editor';
import { SUGGESTED_PRODUCT_TAGS, type ProductRecord } from '@/lib/products';

interface ProductsTableProps {
  products: ProductRecord[];
  activeTag?: string;
}

export function ProductsTable({ products, activeTag }: ProductsTableProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Products from Catalogs</h3>
        <div className="card-tools">
          <span className="badge badge-primary mr-2">{products.length} total</span>
        </div>
      </div>
      <div className="card-body pb-2">
        <div className="mb-3">
          <span className="text-muted mr-2">Filter by tag:</span>
          <a
            href="/products"
            className={`badge mr-1 ${!activeTag ? 'badge-primary' : 'badge-secondary'}`}
          >
            all
          </a>
          {SUGGESTED_PRODUCT_TAGS.map((tag) => (
            <a
              key={tag}
              href={`/products?tag=${tag}`}
              className={`badge mr-1 ${activeTag === tag ? 'badge-primary' : 'badge-secondary'}`}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
      <div className="card-body table-responsive p-0 pt-0">
        <table className="table table-bordered table-striped table-hover mb-0">
          <thead className="thead-light">
            <tr>
              <th style={{ width: '50px' }}>#</th>
              <th>Product</th>
              <th style={{ width: '120px' }}>SKU</th>
              <th style={{ width: '140px' }}>Company</th>
              <th style={{ width: '100px' }}>Price</th>
              <th style={{ width: '320px' }}>Tags</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-5">
                  No products yet. Upload a catalog PDF to extract products with tags.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{product.name || '-'}</strong>
                    {product.category ? (
                      <div className="text-muted small">{product.category}</div>
                    ) : null}
                  </td>
                  <td>{product.sku || '-'}</td>
                  <td>{product.companyName || '-'}</td>
                  <td>
                    {product.price ? `${product.currency || '$'}${product.price}` : '-'}
                  </td>
                  <td>
                    <ProductTagsEditor
                      productId={product._id}
                      initialTags={product.tags ?? []}
                    />
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
