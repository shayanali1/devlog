import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NewLog from './pages/NewLog';
import Dashboard from './pages/Dashboard';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/new-log', label: 'New Log', icon: 'add_box' },
  ];

  return (
    <nav className="h-full w-64 hidden md:flex flex-col bg-surface-container/50 backdrop-blur-md border-r border-outline-variant/30 fixed left-0 top-0 z-40">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-primary font-sans">DevLog</h1>
        <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider font-mono">Quiet Productivity</p>
      </div>
      <div className="px-4 flex flex-col gap-2 flex-1 mt-4">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all text-left w-full ${
                isActive
                  ? 'bg-secondary-container/20 border border-secondary-container/30 text-secondary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-mono text-sm font-medium">{link.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-on-surface min-h-screen flex antialiased dark">
        <Sidebar />
        <main className="flex-1 min-h-screen md:ml-64 px-6 md:px-10 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-log" element={<NewLog />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;