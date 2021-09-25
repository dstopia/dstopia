'use strict'

const router = require('express').Router()

// post controller
const {
    getPost,
    addPost,
    updatePostData,
    removePost,
} = require('../controllers/post.controllers')


// get post
router.get('/', getPost)

// Add post 
router.post('/', addPost)

// update post
router.put('/', updatePostData)

// delete post
router.delete('/', removePost)

module.exports = router