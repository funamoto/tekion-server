var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/register', function (req, res) {
    res.render('register', { title: "テキオン - 組織情報登録" });
});

router.post('/register', function (req, res, next) {
    if (req.body.voteThreshold < 0 || req.body.voteAvailableTime < 0) {
        var err = new Error('Bad Request');
        err.status = 400;
        return next(err);
    }
    Account.register(new Account({
        username: req.body.username,
        organizationName: req.body.organizationName,
        locationCode: req.body.locationCode,
        userToken: req.body.userToken,
        voteThreshold: req.body.voteThreshold,
        voteAvailableTime: req.body.voteAvailableTime
    }), req.body.password, function (err, account) {
        if (err) {
            return res.render('register', { title: "テキオン - 組織情報登録", error: err.message });
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function (req, res) {
    res.render('login', { title: "テキオン - 組織情報管理", user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    // TODO: 認証失敗時のエラーハンドリングをなんとかする
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/edit', function (req, res) {
    Account.find({ username: req.user.username }, function (err, accounts) {
        if (err) {
            res.send(400, err.message);
            return;
        }
        if (accounts.length < 1) {
            res.send(403, 'user edit failed');
            return;
        }
        var username = accounts[0].username;
        var organizationName = accounts[0].organizationName;
        var locationCode = accounts[0].locationCode;
        var userToken = accounts[0].userToken;
        var voteThreshold = accounts[0].voteThreshold;
        var voteAvailableTime = accounts[0].voteAvailableTime;

        res.render('edit', {
            title: "テキオン - 組織情報変更",
            username: username,
            organizationName: organizationName,
            locationCode: locationCode,
            userToken: userToken,
            voteThreshold: voteThreshold,
            voteAvailableTime: voteAvailableTime
        });
    });
});

router.post('/edit', function (req, res, next) {
    var err = new Error('作成中');
    err.status = 404; 
    return next(err);
});

module.exports = router;