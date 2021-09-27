'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { isEmail } = require('validator')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Username is required',
            unique: true,
            min: 4,
            max: 20,
            lowercase: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [isEmail, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: 'Password is required',
            min: 6,
        },
        gender: {
            type: String,
            default: 'male',
        },
        desc: {
            type: String,
            default: 'No Description.',
        },
        post: [
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
