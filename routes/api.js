var express = require('express');
var router = express.Router();

router.get('/display', function (req, res) {
  var username = req.query.username;
  var password = req.query.password;
  var judge = 0;
  switch (username) {
    case '100':
      judge = 0;
      break;
    case '101':
      judge = 1;
      break;
    case '102':
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
