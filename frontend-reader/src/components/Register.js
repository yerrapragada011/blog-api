import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: 'USER'
        })
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate('/')
      } else {
        setError(data.message || 'Registration failed.')
      }
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred.')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
