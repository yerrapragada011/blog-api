import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL

  useEffect(() => {
    if (token) {
      fetch(`${apiUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => {
          console.error(err)
          setUser(null)
        })
    }
  }, [token, apiUrl])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
  }

  return (
    <Router>
      <div>
        {token ? (
          <nav>
            <span>{user ? `Welcome, ${user.username}` : 'Loading...'}</span>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        ) : (
          <nav>
            <Link to='/login'>Login</Link> |{' '}
            <Link to='/register'>Register</Link>
          </nav>
        )}
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route
            path='/posts/:id'
            element={<PostDetail token={token} user={user} />}
          />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
