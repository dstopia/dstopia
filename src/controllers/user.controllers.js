exports.renderUser = function (req, res) {
    // mengambil username dari url
    const username = req.params.username
    res.json({ username })
}
