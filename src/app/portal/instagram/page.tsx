
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PostPreview from '../PostPreview';

interface Post {
  id: number;
  caption: string;
  imageUrls: string[];
  date: string;
  profile: {
    username: string;
    profilePicUrl?: string | null;
  };
}

const InstagramPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // TODO: Fetch user role from an authentication context
  const userRole = 'admin'; // Hardcoded for now

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('fetchPosts started');
      try {
        const response = await fetch('/api/posts');
        console.log('fetchPosts response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log('fetchPosts data:', data);
        setPosts(data.posts);
      } catch (err: any) {
        console.error('Error in fetchPosts:', err);
        setError(err.message);
      } finally {
        console.log('fetchPosts finished');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts?id=${postId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Instagram Integration</h1>
        <Link href="/portal/instagram/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Post
          </button>
        </Link>
      </div>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p>No posts found. <Link href="/portal/instagram/new" className="text-blue-500">Create one now</Link>.</p>
      )}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <button
              onClick={() => openPostModal(post)}
              className="w-full text-left"
            >
              <div className="flex items-center gap-4">
                {post.profile.profilePicUrl ? (
                  <img src={post.profile.profilePicUrl} alt={post.profile.username} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                )}
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{post.profile.username}</p>
                    <p className="text-lg text-gray-700">{new Date(post.date).toLocaleDateString()}</p>
                  </div>
                  <p className="truncate">{post.caption}</p>
                </div>
              </div>
            </button>
            {userRole === 'admin' && (
              <button
                onClick={() => handleDeletePost(post.id)}
                className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 flex justify-end">
              <button onClick={closePostModal} className="text-2xl font-bold">&times;</button>
            </div>
            <PostPreview
              images={selectedPost.imageUrls}
              caption={selectedPost.caption}
              username={selectedPost.profile.username}
              date={selectedPost.date}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InstagramPage;
