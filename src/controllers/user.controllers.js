'use strict'

const User = require('../models/user.models')
const debug = require('debug')('dev')
const {isEmail, isAlphaNumeric} = require('validator')
const { genSalt, hash } = require('bcryptjs')

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find({},'_id username email gender desc')
        debug(user)
        res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.addUser = async (req, res) => {
    try {
        const {username, email, password, gender } = req.body
        console.log(username)
        const error = []
        
        // validate username
        !isAlphaNumeric(username) && error.push('Username must not contain any special characters!')
        
        // cek if username is already exist
        const userExist = false
        !userExist && error.push('User Already Exist!')
        
        // validate email
        !isEmail(email) && error.push('Email Not Valid')
        
        // cek if email is already exist
        const emailExist = false
        !emailExist && error.push('Email Already Exist!')
        
        // hash password
        const salt = await genSalt()
        const hashedPassword = await hash(password, salt)
        
        // set default user image profile
        let img = ''
        gender === 'male' ? img = '/male.png' : img = 'female.png'
        
        // respone error
       // error.length > 0 && res.json({error})
        console.log(error)
        // initialize new user collection
        const user = new User({
            img,
            email, 
            gender,
            username, 
            password:hashedPassword, 
            
        })
        
        // save to database
        const data = await user.save()
        console.log({data})
        debug(data)
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
