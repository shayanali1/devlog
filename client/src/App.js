import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NewLog from './pages/NewLog';
import Dashboard from './pages/Dashboard';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <h1 className="logo" onClick={() => navigate('/')}>DevLog 🚀</h1>
      <div className="nav-links">
        <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
        <button className="nav-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button className="nav-btn" onClick={() => navigate('/new-log')}>+ New Log</button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-log" element={<NewLog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;