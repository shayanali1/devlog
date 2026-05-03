import './App.css';

function App() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">DevLog 🚀</h1>
        <span className="tagline">Track your coding journey</span>
      </nav>

      {/* Main content */}
      <main className="main">
        <div className="hero">
          <h2>Welcome back, Dev 👋</h2>
          <p>What did you build or learn today?</p>
          <button className="btn-primary">+ Log Today's Win</button>
        </div>
      </main>

    </div>
  );
}

export default App;