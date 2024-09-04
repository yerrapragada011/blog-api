import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import PostManager from './components/PostManager'
import NewPost from './components/NewPost'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <Router>
      <div>
        {token && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path='/login' element={<Login setToken={setToken} />} />
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
        </Routes>
      </div>
    </Router>
  )
}

export default App
