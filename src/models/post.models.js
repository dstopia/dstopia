'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')
const User = require('./user.models')

const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        img_post: {
            type: String,
            default: 'https://source.unsplash.com/random/1254x836',
        },
        timeSend: {
            type: String,
            default: moment().format('hh:mm A'),
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        caption: {
            type: String,
            maxlength: [100, 'caption must be less than 100 characters'],
            default: 'No Caption',
            required: true,
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'PostComment',
            },
        ],
    },
    {
        timestamps: true,
    }
)

// post methods
postSchema.methods.addToUserPost = function (userId) {
    // push post id to user collection post array
    return User.findByIdAndUpdate(
        { _id: userId },
        {
            $push: {
                post: this._id,
            },
        }
    )
}

const Post = mongoose.model('Post', postSchema)

module.exports = Post
