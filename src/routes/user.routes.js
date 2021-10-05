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

/** GET METHOD */

// get user with post
router.get('/post', getUserWithPost)

// cek if user logged in
router.get('/login', isLoggedIn)

// follow status
router.get('/follow-status', followStatus)

// get user by id
router.get('/:id', getUserById)

// get user
router.get('/', getUsers)

/**  PUT METHOD */

// follow
router.put('/follow', follow)

// unfollow
router.put('/unfollow', unFollow)

// update user
router.put('/update', updateUserData)

/** POST METHOD */

// user login
router.post('/login', checkUser)

// Add user
router.post('/', addUser)

/** DELETE METHOD */

// delete user
router.delete('/', removeUser)

module.exports = router
