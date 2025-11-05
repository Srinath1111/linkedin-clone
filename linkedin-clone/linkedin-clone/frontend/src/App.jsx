import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Feed from './components/Feed'
import { setAuthToken } from './api'

function App(){
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)
  const navigate = useNavigate()

  useEffect(()=>{
    if (user?.token) setAuthToken(user.token)
  },[user])

  function handleLogout(){
    localStorage.removeItem('user')
    setUser(null)
    setAuthToken(null)
    navigate('/')
  }

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={user ? <Feed user={user} /> : <Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup onSignup={setUser} />} />
          <Route path="/feed" element={<Feed user={user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
