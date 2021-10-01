'use strict'

const Post = require('../models/post.models')
const User = require('../models/user.models')
const debug = require('debug')('dev')

exports.addPost = (req, res) => {
    const { userId, username, caption } = req.body

    const post = new Post({ username, caption })

    post.save((error, postResult) => {
        if (error) {
            debug({ postError: error })
            return res.status(404).json(error)
        } else {
            // push post id to user collection post array
            User.findByIdAndUpdate(
                { _id: userId },
                {
                    $push: {
                        post: {
                            _id: postResult._id,
                        },
                    },
                },
                {},
                (error, userResult) => {
                    if (error) {
                        debug(error)
                    } else {
                        debug(userResult)
                    }
                }
            )
            res.json(postResult)
        }
    })
}

exports.getPost = async (req, res) => {
    try {
        const data = await Post.find().sort({ createdAt: 1 })
        res.json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.updatePostCaption = (req, res) => {
    try {
        const { caption, id } = req.body
        const query = Post.findByIdAndUpdate(
            id,
            {
                $set: {
                    caption,
                },
            },
            {
                new: true,
            }
        )
        res.json(query)
    } catch (error) {
        debug(error)
        res.status(404).json(error)
    }
}

exports.removePost = (req, res) => {
    try {
        const { id } = req.body
        const query = Post.findByIdAndDelete(id)
        res.json(query)
    } catch (error) {
        res.status(404).json(error)
    }
}
