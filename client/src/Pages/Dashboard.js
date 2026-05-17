import { useState, useEffect } from 'react';

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then((res) => res.json())
      .then((data) => { setLogs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalLogs = logs.length;

  const calculateStreak = () => {
    if (logs.length === 0) return 0;
    const dates = logs.map((log) => new Date(log.created_at).toDateString());
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

  const tagCounts = logs.reduce((acc, log) => {
    if (log.tag) { acc[log.tag] = (acc[log.tag] || 0) + 1; }
    return acc;
  }, {});

  const moodCounts = logs.reduce((acc, log) => {
    if (log.mood) { acc[log.mood] = (acc[log.mood] || 0) + 1; }
    return acc;
  }, {});

  const moodConfig = {
    great: { icon: 'sentiment_satisfied', label: 'Great', color: 'text-primary bg-primary/10 border-primary/20' },
    okay: { icon: 'sentiment_neutral', label: 'Okay', color: 'text-secondary bg-secondary/10 border-secondary/20' },
    stuck: { icon: 'sentiment_dissatisfied', label: 'Stuck', color: 'text-tertiary bg-tertiary/10 border-tertiary/20' },
    tired: { icon: 'bedtime', label: 'Tired', color: 'text-outline bg-outline/10 border-outline/20' },
  };

  const tagBarColors = [
    'bg-primary',
    'bg-tertiary-container',
    'bg-secondary',
    'bg-tertiary',
    'bg-primary-container',
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-on-surface-variant font-mono">Loading dashboard...</p>
    </div>
  );

  return (
    <div className="max-w-4xl">
      <h2 className="text-5xl font-bold text-on-surface font-sans mb-2">Dashboard</h2>
      <p className="text-on-surface-variant font-sans mb-10">Your productivity overview and coding habits.</p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-container/40 border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">Total Logs</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">book_2</span>
          </div>
          <span className="text-5xl font-bold text-on-surface font-sans">{totalLogs}</span>
        </div>

        <div className="bg-surface-container/40 border border-primary/30 rounded-xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-primary">Current Streak</span>
            <span className="material-symbols-outlined text-tertiary-container text-[20px]">local_fire_department</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-on-surface font-sans">{calculateStreak()}</span>
            <span className="text-on-surface-variant font-sans text-sm">Days</span>
          </div>
        </div>

        <div className="bg-surface-container/40 border border-outline-variant/30 rounded-xl p-6 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">Topics Covered</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">tag</span>
          </div>
          <span className="text-5xl font-bold text-on-surface font-sans">{Object.keys(tagCounts).length}</span>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="bg-surface-container/40 border border-outline-variant/30 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">bar_chart</span>
          <h3 className="text-lg font-semibold text-on-surface font-sans">Topic Breakdown</h3>
        </div>
        {Object.keys(tagCounts).length === 0 ? (
          <p className="text-on-surface-variant font-sans text-sm">No tags logged yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {Object.entries(tagCounts).map(([tag, count], index) => (
              <div key={tag}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono border border-outline-variant/40 bg-surface-variant/30 px-2 py-0.5 rounded text-on-surface-variant">{tag}</span>
                  <span className="text-xs font-mono text-on-surface-variant">{Math.round((count / totalLogs) * 100)}%</span>
                </div>
                <div className="h-1 bg-surface-variant/30 rounded-full">
                  <div
                    className={`h-1 rounded-full ${tagBarColors[index % tagBarColors.length]}`}
                    style={{ width: `${(count / totalLogs) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mood Tracker */}
      <div className="bg-surface-container/40 border border-outline-variant/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">mood</span>
          <h3 className="text-lg font-semibold text-on-surface font-sans">Mood Tracker</h3>
        </div>
        {Object.keys(moodCounts).length === 0 ? (
          <p className="text-on-surface-variant font-sans text-sm">No moods logged yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(moodCounts).map(([mood, count]) => {
              const config = moodConfig[mood] || { icon: 'mood', label: mood, color: 'text-outline bg-outline/10 border-outline/20' };
              return (
                <div key={mood} className={`flex flex-col items-center gap-3 p-5 rounded-xl border ${config.color}`}>
                  <span className="material-symbols-outlined text-[32px]">{config.icon}</span>
                  <span className="text-sm font-sans">{config.label}</span>
                  <span className="text-xs font-mono opacity-70">{count} logs</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;