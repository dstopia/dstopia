'use strict'

const router = require('express').Router()

// post controller
const {
    getPost,
    addPost,
    updatePostCaption,
    removePost,
} = require('../controllers/post.controllers')


// get post
router.get('/', getPost)

// Add post 
router.post('/', addPost)

// update post
router.put('/', updatePostCaption)

// delete post
router.delete('/', removePost)

module.exports = router