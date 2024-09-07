import React, { useEffect, useState } from 'react'

const PostManager = ({ token }) => {
  const [posts, setPosts] = useState([])
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL

  useEffect(() => {
    fetch(`${apiUrl}/api/posts/manage`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          setPosts([])
          console.error('Unexpected response format:', data)
        }
      })
      .catch((err) => console.error(err))
  }, [token, apiUrl])

  const togglePublish = (id) => {
    fetch(`${apiUrl}/api/posts/${id}/publish`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPosts((prev) =>
          prev.map((post) => (post.id === id ? updatedPost : post))
        )
      })
      .catch((err) => console.error(err))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`${apiUrl}/api/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (res.ok) {
            setPosts((prev) => prev.filter((post) => post.id !== id))
          } else {
            console.error('Failed to delete post.')
          }
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div>
      <h2>Manage Posts</h2>
      <a href='/new'>Create New Post</a>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Published: {post.published ? 'Yes' : 'No'}</p>
            <button onClick={() => togglePublish(post.id)}>
              {post.published ? 'Unpublish' : 'Publish'}
            </button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <a href={`/edit/${post.id}`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostManager
