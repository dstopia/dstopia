'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const postCommentSchema = new Schema(
    {
        sender: {
            type: Schema.Type.ObjectId,
            ref: 'User',
        },
        timeSend: {
            type: String,
            default: moment().format('hh:mm A'),
        },
        msg: {
            type: String,
            maxlength: [100,'message must be less than 100 character'],
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