import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewLog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      alert('Please enter a title!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, tag, mood }),
      });
      const data = await response.json();
      console.log('Saved:', data);
      navigate('/');
    } catch (err) {
      console.error('Error saving log:', err);
      alert('Failed to save log. Is your server running?');
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <div className="form-container">
        <h2>Log Today's Win 📝</h2>
        <p>What did you work on today?</p>

        <input
          className="input"
          type="text"
          placeholder="Title — e.g. Built my first React page"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Describe what you did, learned, or struggled with..."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select className="input" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Select a tag</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="python">Python</option>
          <option value="dsa">DSA</option>
          <option value="css">CSS</option>
          <option value="other">Other</option>
        </select>

        <select className="input" value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">How are you feeling?</option>
          <option value="great">😄 Great</option>
          <option value="okay">😐 Okay</option>
          <option value="stuck">😤 Stuck</option>
          <option value="tired">😴 Tired</option>
        </select>

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Log'}
        </button>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewLog;