import { useState, useEffect } from 'react';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching logs:', err);
        setLoading(false);
      });
  }, []);

  // Total logs
  const totalLogs = logs.length;

  // Streak calculator
  const calculateStreak = () => {
    if (logs.length === 0) return 0;
    const dates = logs.map((log) =>
      new Date(log.created_at).toDateString()
    );
    const uniqueDates = [...new Set(dates)];
    uniqueDates.sort((a, b) => new Date(b) - new Date(a));
    let streak = 1;
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = (new Date(uniqueDates[i]) - new Date(uniqueDates[i + 1])) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  };

  // Tags breakdown
  const tagCounts = logs.reduce((acc, log) => {
    if (log.tag) {
      acc[log.tag] = (acc[log.tag] || 0) + 1;
    }
    return acc;
  }, {});

  // Mood breakdown
  const moodCounts = logs.reduce((acc, log) => {
    if (log.mood) {
      acc[log.mood] = (acc[log.mood] || 0) + 1;
    }
    return acc;
  }, {});

  const moodEmoji = {
    great: '😄',
    okay: '😐',
    stuck: '😤',
    tired: '😴',
  };

  if (loading) return <div className="main"><p>Loading dashboard...</p></div>;

  return (
    <div className="main">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Your Dashboard 📊</h2>

        {/* Stats row */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{totalLogs}</span>
            <span className="stat-label">Total Logs</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{calculateStreak()}</span>
            <span className="stat-label">Day Streak 🔥</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{Object.keys(tagCounts).length}</span>
            <span className="stat-label">Topics Covered</span>
          </div>
        </div>

        {/* Tags breakdown */}
        <div className="breakdown-section">
          <h3>Logs by Topic</h3>
          {Object.keys(tagCounts).length === 0 ? (
            <p className="empty-text">No tags yet</p>
          ) : (
            <div className="breakdown-list">
              {Object.entries(tagCounts).map(([tag, count]) => (
                <div key={tag} className="breakdown-item">
                  <span className="breakdown-label">{tag}</span>
                  <div className="breakdown-bar-container">
                    <div
                      className="breakdown-bar"
                      style={{ width: `${(count / totalLogs) * 100}%` }}
                    />
                  </div>
                  <span className="breakdown-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mood breakdown */}
        <div className="breakdown-section">
          <h3>Mood Tracker</h3>
          {Object.keys(moodCounts).length === 0 ? (
            <p className="empty-text">No moods logged yet</p>
          ) : (
            <div className="mood-grid">
              {Object.entries(moodCounts).map(([mood, count]) => (
                <div key={mood} className="mood-card">
                  <span className="mood-emoji">{moodEmoji[mood]}</span>
                  <span className="mood-name">{mood}</span>
                  <span className="mood-count">{count} logs</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;