'use strict'

const router = require('express').Router()

const {
    getUsers,
    addUser,
    updateUserData,
    removeUser,
    getUserWithPost,
    checkUser,
    getUserById,
    isLoggedIn,
    follow,
    unFollow,
    followStatus,
} = require('../controllers/user.controllers')

const {
    isAuth
} = require('../middleware/isAuth')

/** GET METHOD */

// get user with post
router.get('/post', getUserWithPost)

// cek if user logged in
router.get('/login', isLoggedIn)

// follow status
router.get('/follow-status', followStatus)

// delete user
router.get('/del/:id', isAuth, removeUser)

// get user by id
router.get('/:id', getUserById)

// get user
router.get('/', getUsers)

/**  PUT METHOD */

// follow
router.put('/follow',isAuth, follow)

// unfollow
router.put('/unfollow',isAuth, unFollow)

// update user
router.put('/update', isAuth, updateUserData)

/** POST METHOD */

// user login
router.post('/login', checkUser)

// Add user
router.post('/', addUser)



module.exports = router