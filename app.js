'use strict'

require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json({
    limit: '50mb'
}))
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
    })
)
app.use(cookieParser())
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}))


// database connections
require('./src/config/mongodb')

// Routes
app.use('/user', require('./src/routes/user.routes'))
app.use('/post', require('./src/routes/post.routes'))

app.use('/', (req, res) => {
    res.json({
        message: 'Welcome to dstopia server',
    })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json({
        message: 'Page Not Found'
    })
})

module.exports = app