import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const token = useState(localStorage.getItem('token'))

  useEffect(() => {
    fetch(`/api/posts/manage/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: comment, postId: parseInt(id) })
    })
      .then((res) => res.json())
      .then((data) => {
        setPost((prev) => ({
          ...prev,
          comments: [...prev.comments, data]
        }))
        setComment('')
      })
      .catch((err) => console.error(err))
  }

  if (!post) return <div>Loading...</div>

  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        By {post.author.username} on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div>{post.content}</div>
      <hr />
      <h3>Comments</h3>
      {post.comments.map((c) => (
        <div key={c.id}>
          <p>{c.content}</p>
          <p>
            By {c.author ? c.author.username : 'Anonymous'} on{' '}
            {new Date(c.createdAt).toLocaleDateString()}
          </p>
          <hr />
        </div>
      ))}
      {token ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder='Add a comment'
          ></textarea>
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <p>You must be logged in to add a comment.</p>
      )}
      <Link to='/'>Go back home</Link>
    </div>
  )
}

export default PostDetail
