var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var Vote = require('../models/vote');

router.get('/display', function (req, res) {
  var username = req.query.username;
  var userToken = req.query.userToken;

  Account.find({ username: username, userToken: userToken }, function (err, accounts) {
    if (err) {
      res.send(400, err.message);
      return;
    }
    if (accounts.length < 1) {
      res.send(403, 'username or token failed');
      return;
    }

    var time = new Date().getTime() - accounts[0].voteAvailableTime;
    Vote.find({
      username: username,
      voteDate: { $gte: time }
    }, function (err, votes) {
      if (err) {
        res.send(400, err.message);
        return;
      }
      var normal = 0;
      var cold = 0;
      var hot = 0;
      for (var i = 0; i < votes.length; i++) {
        switch (votes[i].voteCode) {
          case 1:
            cold++;
            break;
          case 2:
            hot++;
            break;
          default:
            normal++;
            break;
        }
      }

      var th = accounts[0].voteThreshold;
      var result = 0;
      if (cold >= th && cold > hot && cold > normal) {
        result = 1;
      } else if (hot >= th && hot > cold && hot > normal) {
        result = 2;
      }
      res.contentType('application/json');
      res.send(JSON.stringify({ "result": result }))
    });
  });
});

router.get('/vote', function (req, res) {
  // TODO: 出来ればPOSTにする...
  var username = req.query.username;
  var userToken = req.query.userToken;
  var voteCode = req.query.voteCode;
  var voteDate = req.query.voteDate;

  Account.find({ username: username, userToken: userToken }, function (err, accounts) {
    if (err) {
      res.send(400, err.message);
      return;
    }
    if (accounts.length < 1) {
      res.send(403, 'username or token failed');
      return;
    }
    var vote = new Vote();
    vote.username = username;
    vote.voteCode = voteCode;
    vote.voteDate = new Date().getTime();
    vote.save(function (err) {
      if (err) {
        res.send(400, err.message);
        return;
      }
      res.send('vote success');
    });
  });
});

module.exports = router;
