'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

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

const PostComment = mongoose.model('PostComment', postCommentSchema)

module.exports = PostComment