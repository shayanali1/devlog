import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="hero">
        <h2>Welcome back, Dev 👋</h2>
        <p>What did you build or learn today?</p>
        <button className="btn-primary" onClick={() => navigate('/new-log')}>
          + Log Today's Win
        </button>
      </div>
    </div>
  );
}

export default Home;