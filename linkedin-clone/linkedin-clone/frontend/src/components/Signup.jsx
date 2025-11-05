import React, { useState } from 'react'
import { api, setAuthToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Signup({ onSignup }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await api.post('/auth/register', { name, email, password })
      const payload = { token: res.data.token, user: res.data.user }
      localStorage.setItem('user', JSON.stringify(payload))
      setAuthToken(payload.token)
      onSignup(payload)
      nav('/feed')
    }catch(error){
      setErr(error.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div style={{maxWidth:420, margin:'40px auto'}} className="card">
      <h3>Signup</h3>
      {err && <div style={{color:'red'}}>{err}</div>}
      <form onSubmit={submit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
