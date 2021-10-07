'use strict'

const jwt = require('jsonwebtoken')

exports.isAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) return res.status(401).json({
        isLoggedin: false
    })

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
            isLoggedin: false
        })
        req.user = decoded.id
        next()
    })
}