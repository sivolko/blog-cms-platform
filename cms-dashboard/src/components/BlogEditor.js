import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownEditor from './MarkdownEditor';
import ImageUploader from './ImageUploader';
import { createPost, updatePost, getPost } from '../utils/githubApi';

function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    status: 'draft',
    tags: [],
    featuredImage: ''
  });

  useEffect(() => {
    if (id) {
      getPost(id).then(setPost);
    }
  }, [id]);

  const handleSubmit = async (status) => {
    const updatedPost = { ...post, status };
    if (id) {
      await updatePost(id, updatedPost);
    } else {
      await createPost(updatedPost);
    }
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post Title"
        className="w-full text-2xl font-bold mb-4 p-2 border rounded"
      />
      <ImageUploader
        onUpload={(url) => setPost({ ...post, featuredImage: url })}
        currentImage={post.featuredImage}
      />
      <MarkdownEditor
        value={post.content}
        onChange={(content) => setPost({ ...post, content })}
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleSubmit('draft')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Save as Draft
        </button>
        <button
          onClick={() => handleSubmit('published')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default BlogEditor;
