const debug = require('debug')('dev')

exports.renderLogin = (req, res) => {
    res.render('Login')
}

exports.handleUserLogin = (req, res) => {
    // get data from request body
    const data = req.body
    debug(data)
    res.json(data)
}