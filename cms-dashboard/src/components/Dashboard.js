import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../utils/githubApi';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all'); // all, draft, published

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Dashboard</h1>
        <Link
          to="/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          New Post
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'draft', 'published'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded ${filter === status ? 'bg-gray-200' : ''}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500">
                {post.status} · {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/edit/${post.id}`}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Edit
              </Link>
              <button
                onClick={() => deletePost(post.id).then(loadPosts)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
