import React from 'react'
import { api } from '../api'

export default function PostCard({ post, onDeleted, user }){
  async function handleDelete(){
    if (!confirm('Delete this post?')) return
    try{
      await api.delete(`/posts/${post._id}`)
      onDeleted(post._id)
    }catch(err){ console.error(err); alert('Could not delete') }
  }

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <strong>{post.authorName || post.author?.name}</strong>
          <div style={{fontSize:12, color:'#666'}}>{new Date(post.createdAt).toLocaleString()}</div>
        </div>
        {user && user.user && post.author === user.user.id && (
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="post-content" style={{marginTop:8}}>{post.content}</div>
    </div>
  )
}
