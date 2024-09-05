import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EditPost = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setPost({ title: data.title, content: data.content })
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [id, token])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(post)
    })
      .then((res) => res.json())
      .then(() => {
        alert('Post updated successfully!')
        navigate('/manage')
      })
      .catch((err) => console.error(err))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        type='text'
        name='title'
        value={post.title}
        onChange={handleChange}
        placeholder='Post Title'
        required
      />
      <br />
      <textarea
        name='content'
        value={post.content}
        onChange={handleChange}
        placeholder='Post Content'
        required
      />
      <br />
      <button type='submit'>Update Post</button>
    </form>
  )
}

export default EditPost
