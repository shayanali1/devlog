import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then((res) => res.json())
      .then((data) => { setLogs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this log?')) return;
    try {
      await fetch(`http://localhost:5000/api/logs/${Number(id)}`, { method: 'DELETE' });
      setLogs(logs.filter((log) => log.id !== id));
    } catch (err) {
      console.error('Error deleting log:', err);
    }
  };

  const tagColors = {
    react: 'text-primary border-primary/30 bg-primary/10',
    node: 'text-tertiary border-tertiary/30 bg-tertiary/10',
    python: 'text-secondary border-secondary/30 bg-secondary/10',
    dsa: 'text-tertiary-container border-tertiary-container/30 bg-tertiary-container/10',
    css: 'text-primary-container border-primary-container/30 bg-primary-container/10',
    other: 'text-outline border-outline/30 bg-outline/10',
  };

  const moodIcons = {
    great: 'sentiment_satisfied',
    okay: 'sentiment_neutral',
    stuck: 'sentiment_dissatisfied',
    tired: 'bedtime',
  };

  const moodColors = {
    great: 'text-primary bg-primary/10 border-primary/20',
    okay: 'text-secondary bg-secondary/10 border-secondary/20',
    stuck: 'text-tertiary bg-tertiary/10 border-tertiary/20',
    tired: 'text-outline bg-outline/10 border-outline/20',
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-on-surface-variant font-mono">Loading your logs...</p>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <h2 className="text-5xl font-bold text-on-surface font-sans">Your Coding Logs</h2>
        <button
          onClick={() => navigate('/new-log')}
          className="bg-gradient-to-r from-primary to-primary-container text-on-primary hover:opacity-90 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-mono font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(87,241,219,0.3)] border border-primary/50"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Log
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">edit_note</span>
          <p className="text-on-surface-variant font-sans">No logs yet. Start by logging your first win!</p>
          <button
            onClick={() => navigate('/new-log')}
            className="text-primary font-mono text-sm hover:underline"
          >
            + Log Today's Win
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {logs.map((log) => (
            <article
              key={log.id}
              className="bg-surface-container/40 backdrop-blur-md border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-4 hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(87,241,219,0.1)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="flex justify-between items-start border-b border-outline-variant/20 pb-4 relative z-10">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${moodColors[log.mood] || 'text-outline bg-outline/10 border-outline/20'}`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {moodIcons[log.mood] || 'edit_note'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-on-surface-variant block mb-1">
                      {new Date(log.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {log.tag && (
                      <span className={`text-xs font-mono border px-2 py-0.5 rounded-md inline-block ${tagColors[log.tag] || tagColors.other}`}>
                        {log.tag}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-outline hover:text-error transition-colors p-1 rounded-md hover:bg-surface-variant/50"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors font-sans">
                  {log.title}
                </h3>
                {log.description && (
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 font-sans">
                    {log.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;