import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewPost = ({ token }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${apiUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, published })
    })
      .then((res) => res.json())
      .then((data) => {
        navigate('/manage')
      })
      .catch((err) => console.error(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        required
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Content'
        required
      ></textarea>
      <br />
      <label>
        Published:
        <input
          type='checkbox'
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
      </label>
      <br />
      <button type='submit'>Create</button>
    </form>
  )
}

export default NewPost
