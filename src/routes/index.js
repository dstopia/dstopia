const express = require('express')
const router = express.Router()

/* Require controllers */
const { renderUser } = require('../controllers/user.controllers')
const { renderLogin, handleUserLogin } = require('../controllers/login.controllers')
const { renderSignup, handleRegistration } = require('../controllers/signup.controllers')

/**Tambah page baru di bawah sini */

/**Tambah page baru di atas sini */

/* GET signup page. */
router.get('/signup', renderSignup)
router.post('/signup', handleRegistration)
/* end signup page */

/* GET login page. */
router.get('/login', renderLogin)
router.post('/login', handleUserLogin)
/* end login page */

/* GET User page. */
router.get('/:username', renderUser)
/* end User page */

/* GET home page. */
router.get('/', function (req, res) {
    res.json({message:'Home Page'})
})
/* end Home page */

module.exports = router
