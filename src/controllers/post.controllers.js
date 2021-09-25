'use strict'

const { Post } = require('../models/post.models')
const User = require('../models/user.models')

exports.addPost = (req, res) => {
    const { userId, username, caption } = req.body

    const post = new Post({
        username: username,
        userId: userId,
        caption: caption,
    })

    post.save((err, postResult) => {
        if (err) {
            console.log({ postError: err })
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
                (err, userResult) => {
                    if (err) {
                        console.log(err)
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
    }
}

exports.updatePostData = (req, res, next) => {}

exports.removePost = (req, res, next) => {}
