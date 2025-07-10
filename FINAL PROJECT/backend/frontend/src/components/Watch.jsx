import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/videos/${id}/`);
        setVideo(res.data);
      } catch (err) {
        console.error('Error fetching video:', err);
        alert('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!video) return <p>Video not found</p>;

  return (
    <div style={{ padding: '40px', marginLeft: '80px' }}>
      <h2>{video.title}</h2>
      <video width="640" height="360" controls>
        <source src={`http://127.0.0.1:8000${video.video}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{video.description}</p>
      <p>Uploaded by: {video.user.username}</p>
    </div>
  );
}

export default Watch;
