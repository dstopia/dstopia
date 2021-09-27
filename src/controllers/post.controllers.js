'use strict'

const Post = require('../models/post.models')
const User = require('../models/user.models')

exports.addPost = (req, res) => {
    const { userId } = req.body
    const post = new Post(req.body)

    post.save((error, postResult) => {
        if (error) {
            console.log({ postError: error })
            res.status(404).json(error)
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
                        console.log(error)
                        res.status(404).json(error)
                    } else {
                        console.log(userResult)
                    }
                }
            )
            res.json(postResult)
        }
    })
}

exports.getPost = async (req, res) => {
    try {
        const data = await Post.find()
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

exports.updatePostCaption = (req, res, next) => {
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
        console.log(error)
        res.status(404).json(error)
    }
}

exports.removePost = (req, res, next) => {
    try {
        const { id } = req.body
        const query = Post.findByIdAndDelete(id)
        res.json(query)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
