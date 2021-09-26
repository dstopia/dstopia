'use strict'

const User = require('../models/user.models')

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        const data = await user.save()
        res.json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.updateUserData = async (req, res) => {
    try {
        const { id, queryString, data} = req.body
        let query = {}
        switch(queryString) {
            case 'username':
                // cari semua post pada 'username' dan update
                query = {
                    username: data
                }
                break
            case 'email':
                query = {
                    email: data
                }
                break
            case 'desc':
                query = {
                    desc: data
                }
                break
            default :
                query = {}
        }
        const dataQuery = User.findByIdAndUpdate(id, query, { new: true })
        res.json(dataQuery)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.removeUser = async (req, res) => {
    const { id } = req.body
    try {
        const deleted = await User.findByIdAndDelete(id)
        res.json(deleted)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getUserWithPost = async (req, res) => {
    try {
        const user = await User.find().populate('post')
        res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}
