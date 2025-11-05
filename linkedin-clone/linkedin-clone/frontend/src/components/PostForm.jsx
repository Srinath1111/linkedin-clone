import React, { useState } from 'react'
import { api } from '../api'

export default function PostForm({ user, onPosted }){
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(e){
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    try{
      const res = await api.post('/posts', { content, authorName: user.user.name })
      setContent('')
      onPosted(res.data)
    }catch(err){
      console.error(err)
      alert('Could not create post')
    }finally{ setLoading(false) }
  }
  return (
    <div className="card">
      <form onSubmit={submit}>
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="What's on your mind?" />
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post'}</button>
        </div>
      </form>
    </div>
  )
}
