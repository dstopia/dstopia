const debug = require('debug')('dev')

exports.renderSignup = (req, res) => {
    res.render('signup')

}

exports.handleRegistration = (req, res) => {
    // get data from request body
    const data = req.body
    debug(data)
    res.json(data)
}