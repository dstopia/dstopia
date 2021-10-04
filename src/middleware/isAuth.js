'use strict'

exports.isAuth = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.json({ isLoggedin: false })
    }
}
