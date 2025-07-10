import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/user/dashboard/', {
      headers: {
        Authorization: `Token ${user.token}`
      }
    })
    .then(res => setVideos(res.data))
    .catch(err => {
      console.error(err);
      alert("Session expired. Please login again.");
      navigate('/login');
    });
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Your Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>You haven't uploaded any videos.</p>
      ) : (
        videos.map(video => (
          <div key={video.id} style={{ marginBottom: '20px' }}>
            <h4>{video.title}</h4>
            <video width="320" height="180" controls>
              <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;






