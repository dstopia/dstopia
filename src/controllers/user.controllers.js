'use strict'

const User = require('../models/user.models')

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        const data = await user.save()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

exports.updateUserData = async (req, res) => {
    try {
        const id = req.body.id
        const query = req.body.query
        const data = User.findByIdAndUpdate(id, query, { new: true })
        res.json(data)
    } catch (error) {
        console.log(error)
    }
    res.json({ message: 'update user' })
}

exports.removeUser = async (req, res) => {
    const { id } = req.body
    try {
        const deleted = await User.findByIdAndDelete(id)
        res.json(deleted)
    } catch (error) {
        console.log({ errorRemoveUser: error })
    }
}

exports.getUserWithPost = async (req, res) => {
    try {
        const user = await User.find().populate('post')
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}
