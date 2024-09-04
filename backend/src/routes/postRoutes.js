const express = require('express')
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  togglePublish
} = require('../controllers/postController')
const { authenticate, authorize } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPostById)

router.post('/', authenticate, authorize('ADMIN'), createPost)
router.put('/:id', authenticate, authorize('ADMIN'), updatePost)
router.delete('/:id', authenticate, authorize('ADMIN'), deletePost)
router.patch('/:id/publish', authenticate, authorize('ADMIN'), togglePublish)

module.exports = router
