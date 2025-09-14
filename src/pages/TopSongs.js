import React, { useEffect, useState } from "react";
import "./TopSongs.css";
function TopSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await fetch("https://localhost:7224/api/TopSongs");
        if (!response.ok) throw new Error("Failed to fetch songs");
        const data = await response.json();
        setSongs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopSongs();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="top-songs-container">
      <h2>🎵 Top 50 Songs – India</h2>
      <ul className="songs-list">
        {songs.map((track, i) => (
          <li key={i} className="song-item">
            <img
              src={track.coverImage}
              alt={track.name}
              className="album-cover"
            />
            <div className="song-info">
              <p className="song-name">{track.name}</p>
              <p className="song-artist">{track.artist}</p>
              {track.previewUrl ? (
                <audio controls src={track.previewUrl} className="audio-player"></audio>
              ) : (
                <p className="no-preview">No preview available</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSongs;
