require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const passport = require('./passport')

const app = express()

app.use(
  cors({
    origin: 'https://blog-api-three-umber.vercel.app'
  })
)
app.use(express.json())
app.use(passport.initialize())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
