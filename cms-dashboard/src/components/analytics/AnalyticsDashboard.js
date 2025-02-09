import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    totalViews: 0,
    popularPosts: [],
    recentSearches: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Fetch popular posts
        const postsQuery = query(
          collection(db, 'posts'),
          orderBy('views', 'desc'),
          limit(5)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const popularPosts = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch recent searches
        const searchesQuery = query(
          collection(db, 'searches'),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        const searchesSnapshot = await getDocs(searchesQuery);
        const recentSearches = searchesSnapshot.docs.map(doc => doc.data());

        setAnalytics(prev => ({
          ...prev,
          popularPosts,
          recentSearches
        }));
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
          <ul className="space-y-4">
            {analytics.popularPosts.map(post => (
              <li key={post.id} className="flex justify-between items-center">
                <span>{post.title}</span>
                <span className="text-gray-500">{post.views} views</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Searches</h3>
          <ul className="space-y-2">
            {analytics.recentSearches.map((search, index) => (
              <li key={index} className="text-gray-600">
                {search.term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;