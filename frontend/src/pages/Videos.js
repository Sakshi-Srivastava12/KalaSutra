import React, { useEffect, useState } from "react";
import "./Videos.css";

function Videos() {

  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:8080/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  const filtered = category === "All"
    ? videos
    : videos.filter(v => v.category === category);

  return (
    <div className="videos-page">

      <h1>🎨 Art Reels</h1>

      {/* CATEGORY BUTTONS */}
      <div className="category-buttons">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Painting")}>Painting</button>
        <button onClick={() => setCategory("Sketch")}>Sketch</button>
        <button onClick={() => setCategory("DIY")}>DIY</button>
      </div>

      {/* VIDEO GRID */}
      <div className="video-container">

        {filtered.map((video) => (
          <div className="video-card" key={video.id}>

            <video
              src={`http://localhost:8080/uploads/${video.videoUrl}`}
              controls
              loop
            />

            <p>{video.title}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Videos;