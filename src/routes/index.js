const express = require('express')
const router = express.Router()

/**Tambah page baru di bawah sini */

/**Tambah page baru di atas sini */

/* GET signup page. */
router.get('/signup', function (req, res) {
    res.render('signup')
})

/* GET login page. */
router.get('/login', function (req, res) {
    res.render('login')
})

/* GET User page. */
router.get('/:username', function (req, res) {
    // mengambil username dari url
    const username = req.params.username
    res.render('user', { username })
})

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index')
})

module.exports = router
