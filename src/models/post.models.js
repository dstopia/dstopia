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
        hashtag: [
            {
                type: String,
            },
        ],
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

// push post id to user collection post array
postSchema.methods.addToUserPost = function (userId) {
    return User.findByIdAndUpdate(
        { _id: userId },
        {
            $addToSet: {
                post: this._id,
            },
        }
    )
}

// menambahkan hashtag yg sudah di format ke dalam bentuk array
postSchema.methods.addHashtag = function (arr) {
    return Post.updateOne({_id:this.id},{
        $addToSet:{
            hashtag:{
                $each: arr
            }
        }
    })
}

const Post = mongoose.model('Post', postSchema)

module.exports = Post
