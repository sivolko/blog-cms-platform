import React, { useState } from 'react';
import { uploadImage } from '../utils/githubApi';

function ImageUploader({ onUpload, currentImage }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      onUpload(url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
        >
          {uploading ? 'Uploading...' : 'Upload Featured Image'}
        </label>
      </div>
      {currentImage && (
        <img
          src={currentImage}
          alt="Featured"
          className="mt-4 max-w-md rounded shadow"
        />
      )}
    </div>
  );
}

export default ImageUploader;
