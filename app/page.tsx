'use client';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import Posts from '@/components/Posts';

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [post, setPost] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/generatePost', {
        prompt: 'Create a short post about ' + prompt,
      });
      const generatedPost = res.data.post;

      // // Save
      // await axios.post('/api/savePost', {
      //   prompt,
      //   post: generatedPost,
      // });

      setPost(generatedPost);
      setPrompt('');
    } catch (error) {
      console.error('Error generating or saving post:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center p-52 bg-gradient-to-r from-indigo-100 to-emerald-100 h-screen">
      <div className="flex flex-col bg-white rounded-2xl p-6 shadow">
        <form onSubmit={handleSubmit}>
          <input
            className="bg-slate-100 w-full rounded p-2 my-2"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg shadow-lg p-2"
          >
            Generate Post
          </button>
        </form>
      </div>

      <div className="rounded-lg shadow my-4 p-2">
        <h2>Generated Post:</h2>
        <p>{post}</p>
      </div>

      <h2>Previous Posts:</h2>
      <Posts />
    </div>
  );
}
