import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: isOpen ? '0' : '-250px',
    width: '250px',
    height: '100vh',
    backgroundColor: '#222',
    color: '#fff',
    padding: '20px',
    transition: 'left 0.3s ease-in-out',
    zIndex: 1000,
    overflowY: 'auto',
  };

  const linkStyle = {
    display: 'block',
    padding: '12px 0',
    color: '#fff',
    textDecoration: 'none',
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };

  return (
    <div style={sidebarStyle}>
      <h3>Menu</h3>
      <Link to="/" onClick={handleLinkClick} style={linkStyle}>Home</Link>
      <Link to="/upload" onClick={handleLinkClick} style={linkStyle}>Upload</Link>
      <Link to="/dashboard" onClick={handleLinkClick} style={linkStyle}>Dashboard</Link>
      <Link to="/watchlater" onClick={handleLinkClick} style={linkStyle}>Watch Later</Link>
      <Link to="/login" onClick={handleLinkClick} style={linkStyle}>Login</Link>
      <Link to="/register"onClick={handleLinkClick} style={linkStyle}>Register</Link>
    </div>
  );
};

export default Sidebar;





