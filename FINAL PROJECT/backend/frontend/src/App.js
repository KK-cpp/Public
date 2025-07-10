import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import VideoPlayer from "./components/Watch";
import WatchLater from "./components/WatchLater";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/upload" element={user ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/videos/:id" element={<VideoPlayer />} />
        <Route path="/watch-later" element={user ? <WatchLater /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;





