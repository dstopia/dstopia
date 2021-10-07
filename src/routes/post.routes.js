'use strict'

const router = require('express').Router()

// post controller
const {
    getPost,
    addPost,
    updatePostCaption,
    removePost,
} = require('../controllers/post.controllers')

// Middleware
const {
    isAuth
} = require('../middleware/isAuth')

// delete post
router.get('/del/:id', isAuth, removePost)

// get post
router.get('/', getPost)

// Add post
router.post('/', isAuth, addPost)

// update post
router.put('/', isAuth, updatePostCaption)

module.exports = router