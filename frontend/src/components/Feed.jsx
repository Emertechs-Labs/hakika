import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Leaderboard from './Leaderboard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Hakika Feed</h1>
          {loading && <p>Loading posts...</p>}
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                excerpt={post.content.substring(0, 150) + '...'}
                author={{
                  name: post.author || 'Anonymous',
                  address: post.author || '',
                  verified: post.verified
                }}
                niche={post.niche}
                verified={post.verified}
                upvotes={post.upvotes || 0}
                downvotes={post.downvotes || 0}
                comments={0} // Placeholder
                timestamp={new Date(post.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Feed;
