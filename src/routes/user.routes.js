'use strict'

const router = require('express').Router()

const {
    getUsers,
    addUser,
    updateUserData,
    removeUser,
} = require('../controllers/user.controllers')

// get user
router.get('/', getUsers)

// Add user
router.post('/', addUser)

// update user
router.put('/', updateUserData)

// delete user
router.delete('/', removeUser)

module.exports = router
