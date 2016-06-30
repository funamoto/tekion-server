var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.get('/display', function (req, res) {
    var group = req.query.group;
    var password = req.query.password
    var judge = 0;
    switch (group) {
        case "100":
            judge = 0;
            break;
        case "101":
            judge = 1;
            break;
        case "102":
            judge = 2;
            break;
        default:
    }
    res.contentType('application/json');
    res.send(JSON.stringify({ "result": judge }));
});

router.post('/vote', function (req, res) {
    res.send('vote api');
});

module.exports = router;
