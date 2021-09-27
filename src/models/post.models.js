'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const postSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        img: {
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
            maxlength: 100,
            default: 'No Caption',
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

const Post = mongoose.model('Post', postSchema)

module.exports = Post
