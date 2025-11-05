import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Feed from './Feed.jsx';
import { setAuthToken } from './api.js';


function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
    }
  }, [user]);

  function handleLogout() {
    localStorage.removeItem('user');
    setUser(null);
    setAuthToken(null);
    navigate('/');
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


