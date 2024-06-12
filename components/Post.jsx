// pages/index.js
import { useState } from 'react';
import PostList from '../components/PostList';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [post, setPost] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate post
    const res = await fetch('/api/generatePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    const generatedPost = data.post;

    // Save post
    await fetch('/api/savePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, post: generatedPost }),
    });

    setPost(generatedPost);
    setPrompt('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit">Generate Post</button>
      </form>
      <div>
        <h2>Generated Post:</h2>
        <p>{post}</p>
      </div>
      <hr />
      <h2>Previous Posts:</h2>
      <PostList />
    </div>
  );
}
