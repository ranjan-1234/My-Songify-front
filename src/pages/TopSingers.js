import React, { useEffect, useState } from "react";
import "./TopSingers.css";

function TopSingers() {
  const [singers, setSingers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopSingers = async () => {
      try {
        const response = await fetch("https://localhost:7224/api/TopSingers");
        if (!response.ok) throw new Error("Failed to fetch top singers");
        const data = await response.json();
        setSingers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSingers();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="top-singers-container">
      <h2>🎤 Top Indian Singers</h2>
      <ul className="singers-list">
        {singers.map((singer, index) => (
          <li key={index} className="singer-item">
            {singer.image ? (
              <img
                src={singer.image}
                alt={singer.name}
                className="singer-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <div className="singer-info">
              <p className="singer-name">{singer.name}</p>
              <p className="singer-listeners">Listeners: {singer.listeners}</p>
              {singer.url && (
                <a
                  href={singer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="singer-link"
                >
                  View Profile
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSingers;
