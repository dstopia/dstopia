const express = require('express')
const router = express.Router()

/* Require controllers */
const { renderUser } = require('../controllers/dashboardUser.controllers')
const { renderLogin } = require('../controllers/login.controllers')
const { renderSignup } = require('../controllers/signup.controllers')

/**Tambah page baru di bawah sini */

/**Tambah page baru di atas sini */

/* GET signup page. */
router.get('/signup', renderSignup)

/* GET login page. */
router.get('/login', renderLogin)

/* GET User page. */
router.get('/:username', renderUser)

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index')
})

module.exports = router
