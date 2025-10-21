import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (err) {
      // Error handled silently; could add user notification
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hakika Feed</h1>
      {loading && <p>Loading posts...</p>}
      {posts.map(post => (
        <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.content}</p>
          <p>Niche: {post.niche}</p>
          <p>Verified: {post.verified ? 'Yes' : 'No'} (Score: {post.verificationScore})</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
