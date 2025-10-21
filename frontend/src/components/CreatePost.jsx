import React, { useState } from 'react';
import axios from 'axios';
import AGIDrafting from './AGIDrafting';
import { uploadToIPFS } from '../lib/ipfs';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '', niche: 'sports', author: 'Anonymous', image: '' });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadToIPFS(imageFile);
      }
      const postData = { ...form, image: imageUrl };
      await axios.post('http://localhost:5000/api/posts', postData);
      alert('Post created and verified by AGI!');
      setForm({ title: '', content: '', niche: 'sports', author: 'Anonymous', image: '' });
      setImageFile(null);
    } catch (err) {
      alert('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const applySuggestion = (suggestion) => {
    setForm({ ...form, content: form.content + ' ' + suggestion });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <AGIDrafting onSuggestion={applySuggestion} />
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 mb-2 border"
          required
        />
        <select name="niche" value={form.niche} onChange={handleChange} className="w-full p-2 mb-2 border">
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
          <option value="entertainment">Entertainment</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mb-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
