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
router.get('/post', getPost)

// Add post 
router.post('/post', addPost)

// update post
router.put('/post', updatePostData)

// delete post
router.delete('/post', removePost)

module.exports = router