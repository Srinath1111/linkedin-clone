import React, { useState } from 'react'
import { api, setAuthToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      const payload = { token: res.data.token, user: res.data.user }
      localStorage.setItem('user', JSON.stringify(payload))
      setAuthToken(payload.token)
      onLogin(payload)
      nav('/feed')
    }catch(err){
      setErr(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={{maxWidth:420, margin:'40px auto'}} className="card">
      <h3>Login</h3>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
