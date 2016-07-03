﻿var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/register', function (req, res) {
  res.render('register', { title: "テキオン - 組織情報登録" });
});

router.post('/register', function (req, res) {
  Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
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

module.exports = router;