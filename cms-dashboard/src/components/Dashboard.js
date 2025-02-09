import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from GitHub API
  }, []);

  return (
    <div>
      <h1>Blog Dashboard</h1>
      <Link to="/new">New Post</Link>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.status}</p>
            <Link to={`/edit/${post.id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
