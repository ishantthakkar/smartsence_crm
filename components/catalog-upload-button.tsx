'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const ACCEPTED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
];

interface CatalogUploadButtonProps {
  onUploadComplete?: () => void;
}

export function CatalogUploadButton({ onUploadComplete }: CatalogUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!ACCEPTED_TYPES.includes(file.type) && !/\.(xlsx|xls|csv)$/i.test(file.name)) {
      setError('Please upload PDF, image (JPG/PNG), or Excel (XLSX/XLS/CSV).');
      return;
    }

    const maxSizeMb = 50;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is ${maxSizeMb}MB.`);
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/catalogs/upload', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Failed to scan file');
        return;
      }

      if (payload.data?._id) {
        router.push(`/catalogs/review/${payload.data._id}`);
        onUploadComplete?.();
        return;
      }

      router.refresh();
      onUploadComplete?.();
    } catch {
      setError('Upload failed. Check that the backend API is running.');
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp,.gif,.xlsx,.xls,.csv,image/*"
        className="d-none"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <i className="fas fa-spinner fa-spin mr-1" />
            Scanning with Gemini AI...
          </>
        ) : (
          <>
            <i className="fas fa-file-upload mr-1" />
            Upload PDF / Image / Excel
          </>
        )}
      </button>
      <p className="text-muted small mt-2 mb-0">
        PDF catalog, visiting card image, or Excel product sheet. Images are matched to existing
        companies when possible.
      </p>
      {error ? (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
