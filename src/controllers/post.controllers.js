'use strict'

const Post = require('../models/post.models')
const debug = require('debug')('dev')

// create new post
exports.addPost = (req, res) => {
    const { userId, caption, hashtag } = req.body

    // cek caption length
    if (caption.length > 100) {
        return res.json({ error: 'caption must be less than 100 character' })
    }

    const arrHashtag = []

    if (hashtag) {
        // format string hashtag ke dalam array
        const hashtags = hashtag.split(' ')
        if (hashtags.length > 10) {
            return res.json({ error: 'hashtag must be less than 10 word' })
        } else {
            hashtags.map((v) => arrHashtag.push(v))
        }
    }

    // create new post model
    const post = new Post({ user: userId, caption })

    // save new post
    post.save(async (error, result) => {
        if (error) {
            return res.status(404).json({ error: error.message })
        } else {
            if (arrHashtag.length > 0) {
                // save formated hashtag
                const saveHashtag = await post.addHashtag(arrHashtag)
                if (!saveHashtag) {
                    return res
                        .status(400)
                        .json({ error: 'failed to add hashtag' })
                }
            }
            // save post id to user post array
            const savePost = await post.addToUserPost(userId)
            if (savePost) {
                return res.json(result)
            } else {
                return res
                    .status(400)
                    .json({ error: 'failed add post to user post' })
            }
        }
    })
}

// menampilkan seluruh postingan
exports.getPost = async (req, res) => {
    try {
        const data = await Post.find().populate('user', 'username')
        res.json(data)
    } catch (error) {
        res.status(404).json({ error: error.message })
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
        res.status(404).json({ error: error.message })
    }
}

exports.removePost = (req, res) => {
    try {
        const { id } = req.params
        const query = Post.findByIdAndDelete(id)
        res.json({ message: 'post removed', query })
    } catch (error) {
        res.status(400).send(error)
    }
}
