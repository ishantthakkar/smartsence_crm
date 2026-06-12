'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PdfUploadButtonProps {
  onUploadComplete?: () => void;
  endpoint?: string;
  label?: string;
  successPrefix?: string;
  redirectToReview?: boolean;
}

export function PdfUploadButton({
  onUploadComplete,
  endpoint = '/api/catalogs/upload',
  label = 'Upload PDF Catalog',
  successPrefix = 'Catalog scanned',
  redirectToReview = true,
}: PdfUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      setSuccess('');
      return;
    }

    const maxSizeMb = 50;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`PDF is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is ${maxSizeMb}MB.`);
      setSuccess('');
      return;
    }

    setIsUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Failed to scan PDF');
        return;
      }

      if (redirectToReview && payload.data?._id) {
        router.push(`/catalogs/review/${payload.data._id}`);
        onUploadComplete?.();
        return;
      }

      const companyName = payload.data?.company?.name;
      setSuccess(
        companyName
          ? `${successPrefix} for ${companyName} successfully.`
          : `${successPrefix} and saved successfully.`,
      );

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
        accept="application/pdf"
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
            {label}
          </>
        )}
      </button>
      {error ? (
        <div className="alert alert-danger mt-3 mb-0" role="alert">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="alert alert-success mt-3 mb-0" role="alert">
          {success}
        </div>
      ) : null}
    </div>
  );
}
