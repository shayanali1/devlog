import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this log?")) return;
    try {
      await fetch(`http://localhost:5000/api/logs/${id}`, {
        method: "DELETE",
      });
      setLogs(logs.filter((log) => log.id !== id));
    } catch (err) {
      console.error("Error deleting log:", err);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching logs:", err);
        setLoading(false);
      });
  }, []);

  const moodEmoji = {
    great: "😄",
    okay: "😐",
    stuck: "😤",
    tired: "😴",
  };

  if (loading)
    return (
      <div className="main">
        <p>Loading your logs...</p>
      </div>
    );

  return (
    <div className="main">
      <div className="home-container">
        <div className="home-header">
          <h2>Your Coding Journey 🚀</h2>
          <button className="btn-primary" onClick={() => navigate("/new-log")}>
            + Log Today's Win
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="empty-state">
            <p>No logs yet. Start by logging your first win!</p>
          </div>
        ) : (
          <div className="logs-list">
            {logs.map((log) => (
              <div key={log.id} className="log-card">
                <div className="log-card-header">
                  <h3>{log.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span className="mood-badge">
                      {moodEmoji[log.mood] || "📝"} {log.mood}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(log.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                {log.description && (
                  <p className="log-description">{log.description}</p>
                )}
                <div className="log-card-footer">
                  {log.tag && <span className="tag-badge">{log.tag}</span>}
                  <span className="log-date">
                    {new Date(log.created_at).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
