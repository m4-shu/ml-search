import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (query) navigate(`/items?search=${query}`);
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Buscar productos..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Home;
