const express = require('express')
const { addComment } = require('../controllers/commentController')
const { authenticate } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', addComment)

module.exports = router
