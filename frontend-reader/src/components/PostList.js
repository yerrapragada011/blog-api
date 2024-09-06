import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>
            By {post.author.username} on{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default PostList
