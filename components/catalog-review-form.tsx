'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createEmptyContact,
  createEmptyProduct,
  type CatalogDraft,
} from '@/lib/catalog-draft';
import type { CatalogContact, CatalogProduct } from '@/lib/catalogs';
import { SUGGESTED_PRODUCT_TAGS } from '@/lib/products';

interface CatalogReviewFormProps {
  catalog: CatalogDraft;
}

function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

export function CatalogReviewForm({ catalog }: CatalogReviewFormProps) {
  const router = useRouter();
  const [company, setCompany] = useState(catalog.company);
  const [contacts, setContacts] = useState<CatalogContact[]>(
    catalog.contacts?.length ? catalog.contacts : [createEmptyContact()],
  );
  const [products, setProducts] = useState<CatalogProduct[]>(
    catalog.products?.length ? catalog.products : [createEmptyProduct()],
  );
  const [imageUrlsText, setImageUrlsText] = useState(
    (catalog.extractedImageUrls ?? []).join('\n'),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [error, setError] = useState('');

  function updateContact(index: number, field: keyof CatalogContact, value: string) {
    setContacts((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  function updateProduct(index: number, field: keyof CatalogProduct, value: string | number) {
    setProducts((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  async function handleSave() {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/catalogs/${catalog._id}/save`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          contacts: contacts.filter((item) => Object.values(item).some(Boolean)),
          products: products.filter((item) => item.name || item.sku || item.description),
          extractedImageUrls: imageUrlsText
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean),
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Failed to save catalog');
        return;
      }

      const savedId = payload.data?._id ?? catalog._id;
      router.push(`/catalogs/${savedId}`);
      router.refresh();
    } catch {
      setError('Failed to save catalog');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDiscard() {
    if (!window.confirm('Discard this catalog? Nothing will be saved to the database.')) {
      return;
    }

    setIsDiscarding(true);
    setError('');

    try {
      const response = await fetch(`/api/catalogs/${catalog._id}/draft`, {
        method: 'DELETE',
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Failed to discard draft');
        return;
      }

      router.push('/catalogs');
      router.refresh();
    } catch {
      setError('Failed to discard draft');
    } finally {
      setIsDiscarding(false);
    }
  }

  const isImage = catalog.sourceType === 'image' || catalog.mimeType?.startsWith('image/');
  const isExcel = catalog.sourceType === 'excel';
  const isMerge = Boolean(catalog.matchedCatalogId);

  return (
    <div>
      {isMerge ? (
        <div className="alert alert-success">
          <i className="fas fa-building mr-1" />
          Matched existing company:{' '}
          <strong>{catalog.matchedCatalog?.company?.name || catalog.company?.name}</strong>.
          Details below will be merged into that catalog when you save.
        </div>
      ) : null}
      <div className="alert alert-info">
        <i className="fas fa-info-circle mr-1" />
        {isImage
          ? 'Visiting card scanned. Review company and contact details before saving.'
          : isExcel
            ? 'Excel sheet parsed. Review products and company info before saving.'
            : 'Review the scanned data below.'}{' '}
        Click <strong>Save to Database</strong> when ready — nothing is stored until you save.
      </div>

      <div className="row">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Company</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  className="form-control"
                  value={company.website}
                  onChange={(e) => setCompany({ ...company, website: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  className="form-control"
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                />
              </div>
              <div className="form-group mb-0">
                <label>Address</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={company.address}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">Contacts</h3>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setContacts((prev) => [...prev, createEmptyContact()])}
              >
                Add contact
              </button>
            </div>
            <div className="card-body">
              {contacts.map((contact, index) => (
                <div key={`contact-${index}`} className="border rounded p-3 mb-3">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label>Name</label>
                      <input
                        className="form-control"
                        value={contact.name}
                        onChange={(e) => updateContact(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Role</label>
                      <input
                        className="form-control"
                        value={contact.role}
                        onChange={(e) => updateContact(index, 'role', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        value={contact.email}
                        onChange={(e) => updateContact(index, 'email', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        value={contact.phone}
                        onChange={(e) => updateContact(index, 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                  {contacts.length > 1 ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setContacts((prev) => prev.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="card-title mb-0">Products</h3>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={() => setProducts((prev) => [...prev, createEmptyProduct()])}
              >
                Add product
              </button>
            </div>
            <div className="card-body">
              {products.map((product, index) => (
                <div key={`product-${index}`} className="border rounded p-3 mb-3">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label>Name</label>
                      <input
                        className="form-control"
                        value={product.name}
                        onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label>SKU</label>
                      <input
                        className="form-control"
                        value={product.sku}
                        onChange={(e) => updateProduct(index, 'sku', e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={product.description}
                        onChange={(e) => updateProduct(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label>Category</label>
                      <input
                        className="form-control"
                        value={product.category}
                        onChange={(e) => updateProduct(index, 'category', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={product.price}
                        onChange={(e) => updateProduct(index, 'price', Number(e.target.value))}
                      />
                    </div>
                    <div className="col-md-4 form-group">
                      <label>Currency</label>
                      <input
                        className="form-control"
                        value={product.currency}
                        onChange={(e) => updateProduct(index, 'currency', e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <label>Tags (comma separated)</label>
                      <input
                        className="form-control"
                        value={(product.tags ?? []).join(', ')}
                        onChange={(e) =>
                          setProducts((prev) =>
                            prev.map((item, itemIndex) =>
                              itemIndex === index
                                ? { ...item, tags: parseTags(e.target.value) }
                                : item,
                            ),
                          )
                        }
                        placeholder={SUGGESTED_PRODUCT_TAGS.join(', ')}
                      />
                    </div>
                  </div>
                  {products.length > 1 ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setProducts((prev) => prev.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Image URLs</h3>
            </div>
            <div className="card-body">
              <textarea
                className="form-control"
                rows={4}
                value={imageUrlsText}
                onChange={(e) => setImageUrlsText(e.target.value)}
                placeholder="One URL per line"
              />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card sticky-top" style={{ top: '1rem' }}>
            <div className="card-header">
              <h3 className="card-title">File Preview</h3>
            </div>
            <div className="card-body p-0">
              {isImage ? (
                <img
                  src={`/api/catalogs/${catalog._id}/file`}
                  alt={catalog.originalFileName}
                  style={{ width: '100%', maxHeight: '480px', objectFit: 'contain' }}
                />
              ) : (
                <iframe
                  src={`/api/catalogs/${catalog._id}/file`}
                  title={catalog.originalFileName}
                  style={{ width: '100%', height: '480px', border: 'none' }}
                />
              )}
            </div>
            <div className="card-footer">
              <p className="mb-2 text-muted small">
                File: {catalog.originalFileName}
              </p>
              <button
                type="button"
                className="btn btn-success btn-block mb-2"
                onClick={handleSave}
                disabled={isSaving || isDiscarding}
              >
                {isSaving ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-1" />
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-1" />
                    Save to Database
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-block"
                onClick={handleDiscard}
                disabled={isSaving || isDiscarding}
              >
                {isDiscarding ? 'Discarding...' : 'Discard'}
              </button>
              {error ? <div className="alert alert-danger mt-3 mb-0">{error}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
