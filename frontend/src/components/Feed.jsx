import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Leaderboard from './Leaderboard';
import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (pageNum = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts?page=${pageNum}&limit=10`);
      if (pageNum === 1) {
        setPosts(response.data);
        // Cache posts locally for offline
        localStorage.setItem('cachedPosts', JSON.stringify(response.data));
      } else {
        setPosts(prev => [...prev, ...response.data]);
      }
      setHasMore(response.data.length === 10);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      if (pageNum === 1) {
        // Try to load from cache
        const cached = localStorage.getItem('cachedPosts');
        if (cached) {
          setPosts(JSON.parse(cached));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePosts = () => {
    setPage(prev => prev + 1);
    fetchPosts(page + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Hakika Feed</h1>
          {loading && <p>Loading posts...</p>}
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more posts</p>}
          >
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {posts.map(post => (
                <motion.div
                  key={post._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <PostCard
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
                    image={post.image}
                  />
                </motion.div>
              ))}
            </motion.div>
          </InfiniteScroll>
        </div>
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Feed;
