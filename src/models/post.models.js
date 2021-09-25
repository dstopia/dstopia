'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const pathImage = 'https://source.unsplash.com/'

const postSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            default: 'random/1254x836',
            get: (v) => `${pathImage}${v}`,
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
            max: 100,
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

const postCommentSchema = new Schema(
    {
        username: {
            type: String,
            default: 'SomeOne',
        },
        img: {
            type: String,
            default: 'https://source.unsplash.com/random/128x128',
        },
        timeSend: {
            type: String,
            default: moment().format('hh:mm A'),
        },
        msg: {
            type: String,
            max: 100,
            default: 'No Message',
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', postSchema)
const PostComment = mongoose.model('PostComent', postCommentSchema)

module.exports = { Post, PostComment }
