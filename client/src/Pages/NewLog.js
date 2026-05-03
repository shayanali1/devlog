import { useNavigate } from 'react-router-dom';

function NewLog() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="form-container">
        <h2>Log Today's Win 📝</h2>
        <p>What did you work on today?</p>

        <input
          className="input"
          type="text"
          placeholder="Title — e.g. Built my first React page"
        />

        <textarea
          className="textarea"
          placeholder="Describe what you did, learned, or struggled with..."
          rows={5}
        />

        <select className="input">
          <option value="">Select a tag</option>
          <option value="react">React</option>
          <option value="node">Node.js</option>
          <option value="python">Python</option>
          <option value="dsa">DSA</option>
          <option value="css">CSS</option>
          <option value="other">Other</option>
        </select>

        <select className="input">
          <option value="">How are you feeling?</option>
          <option value="great">😄 Great</option>
          <option value="okay">😐 Okay</option>
          <option value="stuck">😤 Stuck</option>
          <option value="tired">😴 Tired</option>
        </select>

        <button className="btn-primary">Save Log</button>
        <button className="btn-secondary" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewLog;