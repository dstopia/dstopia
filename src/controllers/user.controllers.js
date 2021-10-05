'use strict'

const debug = require('debug')('dev')
const { isEmail, isAlphanumeric, isLength, isNumeric } = require('validator')
const { genSalt, hash, compare } = require('bcryptjs')
const jwt = require('jsonwebtoken')

// user models
const User = require('../models/user.models')

// get all user in database
exports.getUsers = async (req, res) => {
    try {
        const user = await User.find(
            {},
            '_id username email gender desc followers following'
        )
        res.json(user)
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

// create jwt token
const createToken = (id) =>
    jwt.sign(
        {
            id,
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: 24 * 60 * 60,
        }
    )

// signup handler
exports.addUser = async (req, res) => {
    const { username, email, password, gender, confirm_password } = req.body

    const error = []

    /** validate username */

    // cek if username exists
    if (!username) {
        return res.status(422).json({
            error: ['username required'],
        })
    }

    //cek if username valid
    !isLength(username, {
        min: 4,
        max: 15,
    })
        ? error.push('username must be more than 4 and less than 15 character')
        : isNumeric(username)
        ? error.push('username must contain alphabet')
        : !isAlphanumeric(username) &&
          error.push('username must not contain any special characters')

    // cek if username is already exist
    const userExist = await User.findOne({
        username,
    })
    userExist && error.push('user already exist')

    /** validate email */

    // cek if email exists
    if (!email) {
        return res.status(422).json({
            error: ['email required'],
        })
    }
    // cek if email valid
    !isEmail(email) && error.push('email not valid')

    // cek if email is already exist
    const emailExist = await User.findOne({
        email,
    })
    emailExist && error.push('email already exist')

    /**  validate password */

    // cek if password exists
    if (!password) {
        return res.status(422).json({
            error: ['password required'],
        })
    }

    // cek confirm password
    password !== confirm_password && error.push('confirm password not match')

    let hashedPassword = ''

    // cek password length
    if (password.length < 6) {
        error.push('password must be more than 6 characters')
    } else {
        // hash password
        try {
            const salt = await genSalt()
            hashedPassword = await hash(password, salt)
        } catch (error) {
            res.status(422).json({
                error: error.message,
            })
        }
    }

    // set default user image profile
    let img = ''
    gender === 'male' ? (img = '/male.png') : (img = '/female.png')

    if (error.length > 0) {
        return res.status(422).json({
            error,
        })
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
            res.cookie('jwt', token, {
                maxAge: 24 * 60 * 60,
                httpOnly: true,
            })

            // set current user in session
            req.session.user = user
            res.json({
                message: 'new user added',
            })
        })
        .catch((error) => {
            res.status(422).json({
                error: error.message,
            })
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
            {
                email: username,
            },
            'username password email desc post followers following img_thumb img_bg'
        )
        if (!user) {
            return res.status(404).json({
                error: 'email not found',
            })
        } else {
            passToCheck = user.password
            currentUser = user
        }
    } else {
        // get user password by username
        const user = await User.findOne(
            {
                username,
            },
            'username email desc post password followers following img_thumb img_bg'
        )
        if (!user) {
            return res.status(404).json({
                error: 'username not found',
            })
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

        res.cookie('jwt', token, {
            maxAge: 24 * 60 * 60,
            httpOnly: true,
        })

        // create user session
        req.session.user = currentUser

        debug(req.session.user)
        return res.json(currentUser)
    } else {
        return res.status(403).json({
            error: 'incorrect password',
        })
    }
}

/** Cek if user already logged in */
exports.isLoggedIn = (req, res) => {
    if (req.session.user) {
        if (req.cookies) {
            debug(req.cookies)
        } else {
            debug('no cookies')
        }
        res.json({
            loggedIn: true,
            user: req.session.user,
        })
    } else {
        res.json({
            loggedIn: false,
        })
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
        const user = User.findByIdAndUpdate(id, query, {
            new: true,
        })
        res.json({
            message: 'update Success',
            user,
        })
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

exports.removeUser = async (req, res) => {
    const { id } = req.body
    try {
        const user = await User.findByIdAndDelete(id)
        res.json({
            message: 'user removed',
            user,
        })
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

exports.getUserWithPost = async (req, res) => {
    try {
        const user = await User.find().populate('post')
        res.json(user)
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(
            id,
            'username email desc post followers following img_thumb img_bg'
        )
        res.json(user)
    } catch (error) {
        res.status(404).json({
            error: error.message,
        })
    }
}

// follower and following

exports.follow = async (req, res) => {
    try {
        // selanjutnya, userId akan diganti dengan id user yang sedang login
        const { followId, userId } = req.body
        await User.findByIdAndUpdate(
            followId,
            {
                // pake addToSet biar id yang sama tidak masuk
                $addToSet: { followers: userId },
            },
            { new: true }
        )
        await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { following: followId },
            },
            { new: true }
        )

        res.json({ message: 'Success following' })
    } catch (error) {
        res.status(404).json({ error: 'Fail to following' })
    }
}

// unfollow

exports.unFollow = async (req, res) => {
    try {
        // selanjutnya, userId akan diganti dengan id user yang sedang login
        const { unfollowId, userId } = req.body
        await User.findByIdAndUpdate(
            unfollowId,
            {
                $pull: { followers: userId },
            },
            { new: true }
        )
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: { following: unfollowId },
            },
            { new: true }
        )

        res.json({ message: 'Success unfollow' })
    } catch (error) {
        res.status(404).json({ error: 'Fail unfollow' })
    }
}

exports.followStatus = async (req, res) => {
    try {
       const user = await User.find(
           {},
           '_id username followers following'
       ).populate('followers following','username')
       res.json(user)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
