const express = require('express')
const {
  register,
  login,
  currentUser
} = require('../controllers/authController')
const { authenticate } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authenticate, currentUser)

module.exports = router
