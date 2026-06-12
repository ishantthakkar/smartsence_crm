'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SUGGESTED_PRODUCT_TAGS } from '@/lib/products';

interface ProductTagsEditorProps {
  productId: string;
  initialTags: string[];
}

export function ProductTagsEditor({ productId, initialTags }: ProductTagsEditorProps) {
  const router = useRouter();
  const [tags, setTags] = useState(initialTags);
  const [customTag, setCustomTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  async function saveTags(nextTags: string[]) {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/products/${productId}/tags`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: nextTags }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Failed to save tags');
        return;
      }

      setTags(payload.data.tags ?? nextTags);
      router.refresh();
    } catch {
      setError('Failed to save tags');
    } finally {
      setIsSaving(false);
    }
  }

  function toggleTag(tag: string) {
    const normalized = tag.toLowerCase();
    const nextTags = tags.includes(normalized)
      ? tags.filter((item) => item !== normalized)
      : [...tags, normalized];
    setTags(nextTags);
    void saveTags(nextTags);
  }

  function addCustomTag() {
    const normalized = customTag.trim().toLowerCase();
    if (!normalized || tags.includes(normalized)) {
      setCustomTag('');
      return;
    }

    const nextTags = [...tags, normalized];
    setTags(nextTags);
    setCustomTag('');
    void saveTags(nextTags);
  }

  return (
    <div>
      <div className="mb-2">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <span key={tag} className="badge badge-info mr-1 mb-1">
              {tag}
              <button
                type="button"
                className="btn btn-link btn-sm text-white p-0 ml-1"
                onClick={() => toggleTag(tag)}
                disabled={isSaving}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-muted small">No tags</span>
        )}
      </div>
      <div className="d-flex flex-wrap">
        {SUGGESTED_PRODUCT_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`btn btn-xs mr-1 mb-1 ${tags.includes(tag) ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => toggleTag(tag)}
            disabled={isSaving}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="input-group input-group-sm mt-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add custom tag"
          value={customTag}
          onChange={(event) => setCustomTag(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addCustomTag();
            }
          }}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={addCustomTag}
            disabled={isSaving}
          >
            Add
          </button>
        </div>
      </div>
      {error ? <div className="text-danger small mt-1">{error}</div> : null}
    </div>
  );
}
