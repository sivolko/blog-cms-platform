import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownEditor({ value, onChange }) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="border rounded">
      <div className="flex justify-between p-2 bg-gray-100">
        <div className="flex gap-2">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 rounded ${!isPreview ? 'bg-white shadow' : ''}`}
          >
            Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 rounded ${isPreview ? 'bg-white shadow' : ''}`}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="p-4">
        {isPreview ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 p-2 font-mono"
            placeholder="Write your post content in Markdown..."
          />
        )}
      </div>
    </div>
  );
}

export default MarkdownEditor;
