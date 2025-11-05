import React, { useEffect, useState } from "react";
import { api } from "./api";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      // Example fetch - update to your actual API endpoint if needed
      const res = await api.get("/posts");
      setPosts(res.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Please log in to view the feed</h2>
      </div>
    );
  }

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading posts...</h3>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.name || "User"} 👋</h2>
      <p>Your LinkedIn-like posts appear here.</p>
      <div style={{ marginTop: "20px" }}>
        {posts.length === 0 ? (
          <p>No posts available yet.</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f3f2ef",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>{post.title || "Sample Post"}</h4>
              <p>{post.content || "Post content goes here..."}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

