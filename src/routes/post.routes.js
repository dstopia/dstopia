'use strict'

const router = require('express').Router()

// post controller
const {
    getPost,
    addPost,
    updatePostCaption,
    removePost,
} = require('../controllers/post.controllers')

// file handler
const upload = require('multer')()

// delete post
router.get('/del/:id', removePost)

// get post
router.get('/', getPost)

// Add post
router.post('/', upload.single('image'), addPost)

// update post
router.put('/', updatePostCaption)

module.exports = router
