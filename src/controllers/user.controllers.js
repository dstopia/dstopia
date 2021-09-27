'use strict'

const User = require('../models/user.models')
const debug = require('debug')('dev')
const { isEmail, isAlphanumeric } = require('validator')
const { genSalt, hash } = require('bcryptjs')

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find({}, '_id username email gender desc')
        debug(user)
        res.json(user)
    } catch (error) {
        res.status(404).json({ msg: 'Database error, User not found!', error })
    }
}

exports.addUser = async (req, res) => {
    const { username, email, password, gender } = req.body

    const error = []

    // validate username
    username === undefined
        ? error.push('Username required')
        : username.length < 4
        ? error.push('Username must be more than 4 character')
        : username.length > 15
        ? error.push('Username must be less than 15 character')
        : !isAlphanumeric(username) &&
          error.push('Username must not contain any special characters!')

    // cek if username is already exist
    const userExist = await User.findOne({ username })
    userExist && error.push('User Already Exist!')

    // validate email
    email === undefined
        ? error.push('Email required')
        : !isEmail(email) && error.push('Email Not Valid')

    // cek if email is already exist
    const emailExist = await User.findOne({ email })
    emailExist && error.push('Email Already Exist!')

    // validate password
    let hashedPassword = ''

    if (password.length < 6) {
        error.push('password must be more than 6 characters')
    } else {
        // hash password
        try {
            const salt = await genSalt()
            hashedPassword = await hash(password, salt)
        } catch (error) {
            res.status(422).json({ msg: 'Failed to hash password.', error })
        }
    }

    // set default user image profile
    let img = ''
    gender === 'male' ? (img = '/male.png') : (img = '/female.png')

    if (error.length > 0) {
        return res.status(422).json({ msg: 'Error not empty', error })
    }
    // initialize new user collection
    const user = new User({
        img,
        email,
        gender,
        username,
        password: hashedPassword,
    })

    // save to database
    user.save()
        .then((data) => {
            res.json({ msg: 'New User Added.', data })
        })
        .catch((error) => {
            res.status(422).json(error)
        })
}

exports.updateUserData = async (req, res) => {
    try {
        const { id, queryString, data } = req.body
        let query = {}
        switch (queryString) {
            case 'username':
                // cari semua post pada 'username' dan update
                query = {
                    username: data,
                }
                break
            case 'email':
                query = {
                    email: data,
                }
                break
            case 'desc':
                query = {
                    desc: data,
                }
                break
            default:
                query = {}
        }
        const dataQuery = User.findByIdAndUpdate(id, query, { new: true })
        res.json({ msg: 'Update Success', dataQuery })
    } catch (error) {
        res.status(404).json({ msg: 'Failed to update user', error })
    }
}

exports.removeUser = async (req, res) => {
    const { id } = req.body
    try {
        const deleted = await User.findByIdAndDelete(id)
        res.json({ msg: 'User Deleted', deleted })
    } catch (error) {
        res.status(404).json({ msg: 'Failed to delete user', error })
    }
}

exports.getUserWithPost = async (req, res) => {
    try {
        const user = await User.find().populate('post')
        res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}
