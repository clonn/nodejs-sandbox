var express = require('express');
var router = express.Router();

/* 使用者刪除文章 */
router.get('/delete/:id', function(req, res, next){
  res.send('delete article function');
});

/* 使用者登入會員 */
router.get('/login', function(req, res, next){
  if((!req.body.user) || (!req.body.passwd)){
  	res.redirect('register');
  	return;
  }
  req.session.name = req.body.user;
  req.session.passwd = req.body.passwd;
  req.session.logined = true;
  res.redirect('/');  
});

/* 使用者新增文章 */
router.get('add', function(req, res, next){
  res.send('add article');
});

/* 使用者更新文章 */
router.get('/update/:id', function(req, res, next){
  res.send('update article');
});

/* 文章留言 */
router.get('comment/:id', function(req, res, next){
  res.send('comment function');
});

module.exports = router;
