import React, { useEffect, useState } from 'react'

const PostManager = ({ token }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts/manage', {
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
  }, [token])

  const togglePublish = (id) => {
    fetch(`/api/posts/${id}/publish`, {
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
            <a href={`/edit/${post.id}`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostManager
