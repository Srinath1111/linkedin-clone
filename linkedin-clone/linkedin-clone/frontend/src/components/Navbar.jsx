import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout }){
  return (
    <div className="nav">
      <div><Link to="/">LinkedIn Clone</Link></div>
      <div>
        {user ? (
          <>
            <span style={{marginRight:12}}>Hi, {user.user?.name || user.name}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <span style={{marginLeft:12}}><Link to="/signup">Signup</Link></span>
          </>
        )}
      </div>
    </div>
  )
}
