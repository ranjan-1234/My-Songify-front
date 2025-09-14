import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // For delete icon
import "./Dashboard.css";

function Dashboard() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData?.userId;

 useEffect(() => {
    if (!userId) return;

    const fetchSongs = async () => {
        try {
            const response = await fetch(`https://localhost:7224/api/SongApi/Playlist/${userId}`);
            if (!response.ok) throw new Error("Failed to fetch songs");
            const data = await response.json();
            setSongs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchSongs();
}, [userId]); // ✅ Now no ESLint warning


    // ✅ Delete song API call
    const handleDelete = async (songId) => {
        try {
            const response = await fetch(`https://localhost:7224/api/SongApi/Delete/${songId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errText = await response.text();
                setMessage(`❌ Failed to delete: ${errText}`);
                setTimeout(() => setMessage(""), 3000);
                return;
            }

            setSongs(songs.filter((song) => song.songId !== songId));
            setMessage("✅ Song deleted successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("❌ Network error");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    
    // ✅ Filter songs by search input
    const filteredSongs = songs.filter((song) =>
        song.fileName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <h2>
                Welcome, <span className="username">{userData?.email?.split("@")[0]}</span> 🎵
            </h2>
            <h3>Your Uploaded Songs</h3>

            {/* ✅ Search Box */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="🔍 Search your songs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ✅ Status Messages */}
            {message && <p className="message">{message}</p>}

            {loading ? (
                <p className="loading">⏳ Loading your songs...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : filteredSongs.length === 0 ? (
                <p className="empty">No songs found 🎶</p>
            ) : (
                <ul className="song-list">
                    {filteredSongs.map((song) => (
                        <li key={song.songId} className="song-item">
                            <span className="song-name">🎶 {song.fileName}</span>
                            <audio controls src={song.filePath}></audio>

                            {/* ✅ Delete Button */}
                            <button
                                className="delete-btn"
                                onClick={() => {
                                    const confirmDelete = window.confirm("Are you sure you want to delete this song?");
                                    if (confirmDelete) {
                                        handleDelete(song.songId);
                                    }
                                }}
                                title="Delete Song"
                            >
                                <Trash2 size={18} />
                            </button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;
