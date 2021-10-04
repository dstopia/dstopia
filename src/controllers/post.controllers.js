'use strict'

const Post = require('../models/post.models')
const debug = require('debug')('dev')

exports.addPost = (req, res) => {
    const { userId, caption } = req.body

    if (caption.length > 100) {
        return res.json({ err: 'Caption must be less than 100 character' })
    }

    const post = new Post({ user: userId, caption })

    post.save(async (error, postResult) => {
        if (error) {
            debug({ postError: error })
            return res.status(404).json(error)
        } else {
            const savePost = await post.addToUserPost(userId)
            debug(savePost)
            if (savePost) {
                return res.json(postResult)
            } else {
                return res
                    .status(400)
                    .json({ msg: 'Failed add post to user post' })
            }
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
