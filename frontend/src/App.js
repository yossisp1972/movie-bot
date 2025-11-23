import React, { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const searchMovie = async () => {
    setError('');
    setMovie(null);
    if (!title) {
      setError('Please enter a  XXX title.');
      return;
    }
    try {
      const res = await fetch(`/api/movie?title=${encodeURIComponent(title)}`);
      const data = await res.json();
      if (data.Response === 'False') {
        setError(data.Error);
      } else {
        setMovie(data);
      }
    } catch (err) {
      setError('Error fetching movie data.');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Movie Bot</h1>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter movie title"
      />
      <button onClick={searchMovie}>Search</button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {movie && (
        <div style={{ marginTop: 20 }}>
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <img src={movie.Poster} alt="Poster" style={{ maxWidth: 200 }} />
        </div>
      )}
    </div>
  );
}

export default App;