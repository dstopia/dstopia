'use strict'

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// database connections
require('./src/config/mongodb')

// firebase
const { admin, db } = require('./src/config/firebase')

// Routes
app.use('/', require('./src/routes/index'))

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
    res.json({message:'Page Not Found'})
})

module.exports = app
