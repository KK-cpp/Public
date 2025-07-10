import React, { useState } from 'react';
import axios from 'axios'; 
function Upload() {
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setVideoData({
      ...videoData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('video', videoData.video);

    
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    try {
      await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`, 
        },
      });
      alert('Video uploaded successfully!');
    } catch (error) {
       console.error('Upload failed:', error.response || error);
    if (error.response && error.response.data && typeof error.response.data === 'string') {
      alert(`Upload failed: ${error.response.status} ${error.response.statusText}`);
    } else if (error.message) {
      alert(`Upload failed: ${error.message}`);
    } else {
      alert('Upload failed!');
    }
  }
};

  return (
    <div className="upload-container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Upload Your Video</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={videoData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            name="description"
            placeholder="Description"
            value={videoData.description}
            onChange={handleChange}
            rows="4"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              resize: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            required
            style={{ fontSize: '16px', fontFamily: 'inherit' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;

