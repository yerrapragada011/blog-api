import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/manage')
        } else {
          alert('Login failed.')
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Author Login</h2>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <br />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default Login
