import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WatchLater() {
  const [videos, setVideos] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.token) return;

    axios.get('http://127.0.0.1:8000/api/watchlater/list/', {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div style={{ padding: '20px', marginLeft: '200px' }}>
      <h2>📂 Watch Later Videos</h2>
      {videos.length === 0 ? (
        <p>No videos in your Watch Later list.</p>
      ) : (
        videos.map(video => (
          <div key={video.id} style={{ marginBottom: '20px' }}>
            <h4>{video.title}</h4>
            <video width="320" height="180" controls>
              <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />
            </video>
            <p>{video.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default WatchLater;

