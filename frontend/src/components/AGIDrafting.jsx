import React, { useState } from 'react';
import axios from 'axios';

const AGIDrafting = ({ onSuggestion }) => {
  const [draft, setDraft] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/agi/suggest', { content: draft });
      setSuggestion(response.data.suggestion);
      onSuggestion(response.data.suggestion);
    } catch (err) {
      // Error handled silently; could add UI feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Draft your post..."
        className="w-full p-2 border"
      />
      <button onClick={getSuggestion} className="mt-2 bg-blue-500 text-white p-2 rounded" disabled={loading}>
        {loading ? 'Getting Suggestion...' : 'Get AGI Suggestion'}
      </button>
      {suggestion && <p className="mt-2 text-green-600">Suggestion: {suggestion}</p>}
    </div>
  );
};

export default AGIDrafting;
