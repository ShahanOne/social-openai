// components/PostList.js
import { useEffect, useState } from 'react';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <p>
            <strong>Timestamp:</strong> {post.timestamp}
          </p>
          <p>
            <strong>Prompt:</strong> {post.prompt}
          </p>
          <p>
            <strong>Post:</strong> {post.post}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}
