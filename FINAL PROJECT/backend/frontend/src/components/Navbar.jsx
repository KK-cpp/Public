import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  

  return (
    <>
     
      
      <nav className="top-navbar bg-dark text-white d-flex justify-content-between align-items-center px-3 py-2">
         <h5 className="ms-100rem">YT Clone</h5>
        <button className="btn btn-outline-light" onClick={toggleSidebar}>
          ☰
        </button>
        
      </nav>

     
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <Link to="/" onClick={toggleSidebar}>🏠 Home</Link>
        <Link to="/dashboard" onClick={toggleSidebar}>📊 Dashboard</Link>
        <Link to="/upload" onClick={toggleSidebar}>⬆️ Upload</Link>
        <Link to="/watch-later"  onClick={toggleSidebar} className="btn btn-outline-light me-2">⏰ Watch Later</Link>
        <Link to="/register" onClick={toggleSidebar}>📝 Register</Link>
        <Link to="/login" onClick={toggleSidebar}>🔐 Login</Link>
        <Link to="/logout" onClick={toggleSidebar}>🚪 Logout</Link>
      </div>
    </>
  );
};

export default Navbar;

