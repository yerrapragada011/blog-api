import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import PostManager from './components/PostManager'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './components/Register'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <Router>
      <div>
        {token && (
          <nav>
            <Link to='/manage'>Manage Posts</Link> |{' '}
            <Link to='/new'>New Post</Link> |{' '}
            <Link to='/' onClick={handleLogout}>
              Logout
            </Link>
          </nav>
        )}

        <Routes>
          <Route path='/' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Register setToken={setToken} />} />
          <Route
            path='/manage'
            element={
              <ProtectedRoute token={token}>
                <PostManager token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/new'
            element={
              <ProtectedRoute token={token}>
                <NewPost token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path='/edit/:id'
            element={
              <ProtectedRoute token={token}>
                <EditPost token={token} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
