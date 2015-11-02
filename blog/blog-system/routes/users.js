var express = require('express');
var router = express.Router();

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
  res.send('respond with a resource');
});

/* 新增文章頁面 */
router.get('/add_article', function(req, res, next) {
  res.send('respond with a resource');
});

/* 修改文章頁面 */
router.get('/modify/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* 訪客留言頁面 */
router.get('/message/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
