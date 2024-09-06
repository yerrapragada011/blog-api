import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const EditPost = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/api/posts/manage/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setPost({ title: data.title, content: data.content })
        setComments(data.comments || [])
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [id, token])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/posts/manage/${id}`, {
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

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      fetch(`/api/posts/${id}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (res.ok) {
            setComments((prev) =>
              prev.filter((comment) => comment.id !== commentId)
            )
          } else {
            console.error('Failed to delete comment.')
          }
        })
        .catch((err) => console.error(err))
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
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
      <Link to='/manage'>Go back home</Link>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete Comment
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EditPost
