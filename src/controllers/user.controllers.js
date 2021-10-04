'use strict'

const debug = require('debug')('dev')
const { isEmail, isAlphanumeric, isLength, isNumeric } = require('validator')
const { genSalt, hash, compare } = require('bcryptjs')
const jwt = require('jsonwebtoken')

// user models
const User = require('../models/user.models')

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find({}, '_id username email gender desc')
        debug(user)
        res.json(user)
    } catch (error) {
        res.status(404).json({ msg: 'Database error, User not found!', error })
    }
}

// create jwt token
const createToken = (id) =>
    jwt.sign({ id }, 'secret jwt token', { expiresIn: 24 * 60 * 60 })

/**
 * When user signup start
 */
exports.addUser = async (req, res) => {
    const { username, email, password, gender, confirm_password } = req.body

    const error = []

    // validate username
    username === undefined
        ? error.push('Username Required')
        : !isLength(username, { min: 4, max: 15 })
        ? error.push('Username must be more than 4 and less than 15 character')
        : isNumeric(username)
        ? error.push('Username must contain alphabet')
        : !isAlphanumeric(username) &&
          error.push('Username must not contain any special characters')

    // cek if username is already exist
    const userExist = await User.findOne({ username })
    userExist && error.push('User already exist')

    // validate email
    email === undefined
        ? error.push('Email required')
        : !isEmail(email) && error.push('Email not valid')

    // cek if email is already exist
    const emailExist = await User.findOne({ email })
    emailExist && error.push('Email already exist!')

    // cek confirm password
    let hashedPassword = ''

    // validate password
    password !== confirm_password && error.push('Confirm password not match')

    if (password.length < 6) {
        error.push('Password must be more than 6 characters')
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
        .then((user) => {
            // All validation done and new user added
            debug(user)

            // create cookie with jwt token
            const token = createToken(user._id)
            res.cookie('jwt', token, { maxAge: 24 * 60 * 60, httpOnly: true })

            // set current usen in session
            req.session.user = user
            res.json({ msg: 'New user added' })
        })
        .catch((error) => {
            res.status(422).json({ msg: 'Failed to add new user', error })
        })
}

/** When user signup end */

/**
 * when user login
 */
exports.checkUser = async (req, res) => {
    const { username, password } = req.body

    let passToCheck = ''
    let currentUser = {}

    if (isEmail(username)) {
        // get user password by email
        const user = await User.findOne(
            { email: username },
            'username password email desc posts followers following img_thumb img_bg'
        )
        if (!user) {
            return res.status(404).json({ msg: 'Email not found' })
        } else {
            passToCheck = user.password
            currentUser = user
        }
    } else {
        // get user password by username
        const user = await User.findOne(
            { username },
            'username email desc posts password followers following img_thumb img_bg'
        )
        if (!user) {
            return res.status(404).json({ msg: 'Username not found' })
        } else {
            passToCheck = user.password
            currentUser = user
        }
    }
    const isValid = await compare(password, passToCheck)
    if (isValid) {
        // create cookie with jwt token
        const token = createToken(currentUser._id)
        debug(token)

        res.cookie('jwt', token, { maxAge: 24 * 60 * 60, httpOnly: true })

        // create user session
        req.session.user = currentUser

        debug(req.session.user)
        return res.json(currentUser)
    } else {
        return res.status(403).json({ msg: 'Incorrect password' })
    }
}

/** Cek if user already logged in */
exports.isLoggedIn = (req, res) => {
    if (req.session.user) {
        if (req.cookies) {
            console.log(req.cookies)
        } else {
            console.log('no cookies')
        }
        res.json({ loggedIn: true, user: req.session.user })
    } else {
        res.json({ loggedIn: false })
    }
}

/** When user login end */

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
        const user = User.findByIdAndUpdate(id, query, { new: true })
        res.json({ msg: 'Update Success', user })
    } catch (error) {
        res.status(404).json({ msg: 'Failed to update user', error })
    }
}

exports.removeUser = async (req, res) => {
    const { id } = req.body
    try {
        const user = await User.findByIdAndDelete(id)
        res.json({ msg: 'User user', user })
    } catch (error) {
        res.status(404).json({ msg: 'Failed to delete user', error })
    }
}

exports.getUserWithPost = async (req, res) => {
    try {
        const user = await User.find().populate('post')
        res.json(user)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(
            id,
            'username email desc posts followers following img_thumb img_bg'
        )
        res.json(user)
    } catch (error) {
        res.status(404).json({ msg: 'User not found', error })
    }
}
