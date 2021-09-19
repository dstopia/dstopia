const express = require('express')
const router = express.Router()

const { getUser, addUser, updateUserData, removeUser } = require('../controllers/user.controllers')
const { getPost, addPost, updatePostData, removePost } = require('../controllers/post.controllers')

/* USER ROUTER */

// get user
router.get('/user', getUser)

// Add user 
router.post('/user', addUser)

// update user
router.put('/user', updateUserData)

// delete user
router.delete('/user', removeUser)

/* END USER ROUTER */

/* POST ROUTER */

// get post
router.get('/post', getPost)

// Add post 
router.post('/post', addPost)

// update post
router.put('/post', updatePostData)

// delete post
router.delete('/post', removePost)

/* END POST ROUTER */

/* GET home page. */
router.get('/', function (req, res) {
    res.json({message:'Home Page'})
})

module.exports = router
