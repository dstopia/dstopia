'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail, isAlphanumeric } = require('validator')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'User is already use'],
            minlength: [4, 'Username must be more than 4 character'],
            maxlength: [15, 'Username must be less than 15 character'],
            lowercase: true,
            validate: [isAlphanumeric, 'Username must not have any special character']
        },
        img_thumb: {
            type: String,
            default: 'https://source.unsplash.com/random/128x128',
        },
        img_bg: {
            type: String,
            default: 'https://source.unsplash.com/random/400x200',
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: [true, 'Email address is already use'],
            required: [true, 'Email address is required'],
            validate: [isEmail, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: [true,'Password is required'],
            minlength: [6, 'Password must be 6 character or more'],
        },
        gender: {
            type: String,
            default: 'male',
        },
        desc: {
            type: String,
            default: 'No Description.',
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User
