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
} = require('../controllers/user.controllers')

// get user with post
router.get('/post', getUserWithPost)

// user login
router.post('/login', checkUser)

// get user by id
router.get('/:id', getUserById)

// get user
router.get('/', getUsers)

// Add user
router.post('/', addUser)

// update user
router.put('/', updateUserData)

// delete user
router.delete('/', removeUser)

module.exports = router
