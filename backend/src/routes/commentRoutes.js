const express = require('express')
const {
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController')
const { authenticate, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', addComment)

router.put('/:id', authenticate, authorize('ADMIN'), updateComment)
router.delete('/:id', authenticate, authorize('ADMIN'), deleteComment)

module.exports = router
