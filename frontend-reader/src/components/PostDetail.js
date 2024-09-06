import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const PostDetail = ({ token, user }) => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [currentCommentId, setCurrentCommentId] = useState(null)
  const [editCommentContent, setEditCommentContent] = useState('')


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
      body: JSON.stringify({
        content: comment,
        postId: parseInt(id),
        authorId: user ? user.id : null
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add comment')
        }
        return res.json()
      })
      .then((data) => {
        setPost((prev) => ({
          ...prev,
          comments: [...prev.comments, data]
        }))
        setComment('')
      })
      .catch((err) => console.error(err))
  }

  const handleDelete = (commentId) => {
    fetch(`/api/posts/${id}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete comment')
        }
        return res.json()
      })
      .then(() => {
        setPost((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c.id !== commentId)
        }))
      })
      .catch((err) => console.error(err))
  }

  const handleEdit = (commentId) => {
    const commentToEdit = post.comments.find((c) => c.id === commentId)
    if (commentToEdit) {
      setEditMode(true)
      setCurrentCommentId(commentId)
      setEditCommentContent(commentToEdit.content)
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    fetch(`/api/posts/${id}/comments/${currentCommentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        content: editCommentContent
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update comment')
        }
        return res.json()
      })
      .then(() => {
        setPost((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c.id === currentCommentId
              ? { ...c, content: editCommentContent }
              : c
          )
        }))
        setEditMode(false)
        setEditCommentContent('')
        setCurrentCommentId(null)
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
          {user && user.id === c.authorId && (
            <>
              <button onClick={() => handleEdit(c.id)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </>
          )}
          <hr />
        </div>
      ))}
      {editMode ? (
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={editCommentContent}
            onChange={(e) => setEditCommentContent(e.target.value)}
            required
            placeholder='Edit your comment'
          ></textarea>
          <button type='submit'>Update</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : token ? (
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
