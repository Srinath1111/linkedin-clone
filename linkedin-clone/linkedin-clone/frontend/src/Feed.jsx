import React, { useEffect, useState } from 'react'
import { api } from './api'
import PostForm from './components/PostForm'
import PostCard from './components/PostCard'

export default function Feed({ user }){
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetchPosts()
  },[])

  async function fetchPosts(){
    setLoading(true)
    try{
      const res = await api.get('/posts')
      setPosts(res.data)
    }catch(err){ console.error(err) }
    setLoading(false)
  }

  function handlePosted(newPost){
    setPosts(prev=>[newPost, ...prev])
  }

  function handleDeleted(id){
    setPosts(prev=>prev.filter(p=>p._id !== id))
  }

  return (
    <div style={{maxWidth:800, margin:'20px auto'}}>
      {user && <PostForm user={user} onPosted={handlePosted} />}
      {loading ? <div>Loading...</div> : (
        posts.map(p => <PostCard key={p._id} post={p} onDeleted={handleDeleted} user={user} />)
      )}
    </div>
  )
}
