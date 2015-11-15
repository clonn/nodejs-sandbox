require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');

/* GET users listing. */

/* 註冊頁 */
router.get('/register', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/');
    return;
  }
  res.render('users/register');
});

/* 登入頁 */
router.get('/signin', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/');
    return;
  }
  res.render('users/signin');
});

/* 登出頁 */
router.get('/signout', function(req, res, next) {
  req.session.logined = false;
  res.redirect('/');
  res.end();
});

/* 忘記密碼 */
router.get('/forget', function(req, res, next) {
  if(req.session.logined){
    res.redirect('/')
    return;
  }
  res.render('users/forget');
});

/* 使用者管理頁 */
router.get('/profile', function(req, res, next) {
  if((!req.session.name) || (!req.session.logined)) {
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name ;
  res.locals.authenticated = req.session.logined;
  Blog.find({ username: req.session.name }, function(err, blogs, count){
    res.render('users/profile', {
      title: 'Blog System',
      blogs: blogs
    });
  });
});

/* 新增文章頁面 */
router.get('/add_article', function(req, res, next) {
  if((!req.session.name) || (!req.session.logined)){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authentiated = req.session.logined;
  res.render('users/add_article');
});

/* 修改文章頁面 */
router.get('/modify/:id', function(req, res, next) {
  if((!req.session.name) || (!req.session.logined)){
    res.redirect('/');
    return;
  }
  res.locals.username = req.session.name;
  res.locals.authentiated = req.session.logined;
  res.locals.messageId = req.params.id;

  Blog.find({_id: req.params.id }, function(err, blogs, count){
    res.render('user/modify', {
      blogs: blogs
    });
  });
});

/* 訪客留言頁面 */
router.get('/message/:id', function(req, res, next) {
  res.locals.username = req.session.name;
  res.locals.authentiated = req.session.logined;
  res.locals.messageId = req.params.id;

  Blog.find({ _id: req.params.id }, function ( err, blogs, count ){
    Comment.find({ messageId: req.params.id }, function ( err, comments, count ){
      res.render( 'users/message', {
        blogs: blogs,
        comments: comments
      });
    });
  });

});

module.exports = router;
