/* eslint-disable strict */
let express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('homepage');
});

module.exports = router;