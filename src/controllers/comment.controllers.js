'use strict'

const PostComment = require('../models/comment.models')

exports.addComment = (req, res ) => {
        const {senderId, msg} = req.body
        
        const comment = new PostComment({
            sender: senderId,
            msg,
        })
        
        comment.save()
        .then((res)=> {
            res.json({msg:'Comment added'})
        })
        . catch((error) => {
            res.status(404).json({msg:error.message})
        })
    }

exports.getCommentByPostId = (req, res ) => {
    try {
        
    } catch (e) {
        res.status(404).json({msg:err.message})
    }
}

exports.addComment = (req, res ) => {
    try {
        
    } catch (e) {
        res.status(404).json({msg:err.message})
    }
}

exports.addComment = (req, res ) => {
    try {
        
    } catch (e) {
        res.status(404).json({msg:err.message})
    }
}

exports.addComment = (req, res ) => {
    try {
        
    } catch (e) {
        res.status(404).json({msg:err.message})
    }
}

exports.addComment = (req, res ) => {
    try {
        
    } catch (e) {
        res.status(404).json({msg:err.message})
    }
}