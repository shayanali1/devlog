import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewLog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  const moods = [
    { value: "great", label: "Great", icon: "sentiment_satisfied" },
    { value: "okay", label: "Okay", icon: "sentiment_neutral" },
    { value: "stuck", label: "Stuck", icon: "sentiment_dissatisfied" },
    { value: "tired", label: "Tired", icon: "bedtime" },
  ];

  const handleSubmit = async () => {
    if (!title) {
      alert("Please enter a title!");
      return;
    }
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, tag, mood }),
      });
      navigate("/");
    } catch (err) {
      alert("Failed to save log. Is your server running?");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-on-surface/20 font-sans mb-1">
        Write Today's Win
      </h2>
      <p className="text-on-surface-variant mb-8">
        Document your progress and log your daily insights.
      </p>

      <div className="bg-surface-container/40 border border-outline-variant/30 rounded-xl p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
            Log Title
          </label>
          <input
            type="text"
            placeholder="What did you work on?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-surface-variant/30 border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors font-sans"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
            Topic Tag
          </label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={{ backgroundColor: "#1e2438", colorScheme: "dark" }}
            className="bg-surface-variant/30 border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary/50 transition-colors font-sans w-full"
          >
            <option value="">Select a primary topic...</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="dsa">DSA</option>
            <option value="css">CSS</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
            Log Body
          </label>
          <textarea
            placeholder="Tell the story of your progress..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="bg-surface-variant/30 border border-outline-variant/50 rounded-lg px-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors font-sans resize-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono uppercase tracking-wider text-on-surface-variant">
            How are you feeling?
          </label>
          <div className="grid grid-cols-4 gap-3">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all ${
                  mood === m.value
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-outline-variant/30 bg-surface-variant/20 text-on-surface-variant hover:border-outline/50"
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {m.icon}
                </span>
                <span className="text-xs font-mono">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-outline-variant/20 pt-4 flex justify-end gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 text-on-surface-variant hover:text-on-surface transition-colors font-sans"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-mono font-medium hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            {loading ? "Saving..." : "Save Log"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewLog;
