require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');

/* 使用者登入會員 */
router.post('/login', function(req, res, next){
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
router.post('/add', function(req, res, next){
  if(!req.session.name){
    res.redirect('/');
    return;
  }

  new Blog({
    username: req.session.name,
    article: req.body.Content,
    createDate: Date.now()
  }).save(function(err){
    if(err){
      console.log('save article fail');
    }
    console.log('save article success');
  });
  res.redirect('/');
});

/* 使用者更新文章 */
router.get('/update/:id', function(req, res, next){
  if(!req.params.id){
    res.redirect('/');
    return;
  }

  Blog.update({_id: req.params.id}, {article: req.body.Content}, function(err){
    if(err){
      console.log('update article fail');
    }else{
      console.log('update article success');
    }
  });
  res.redirect('/users/profile')
});

/* 使用者刪除文章 */
router.get('/delete/:id', function(req, res, next){
  Blog.remove({_id: req.params.id }, function(err){
    if(err){
      console.log('delete article fail');
    } else{
      console.log('delte article success')
    }
    res.redirect('/users/profile')
  });

});

/* 文章留言 */
router.post('/comment/:id', function(req, res, next) {
  if(!req.params.id){
    res.redirect('/');
    return;
  }

  new Comment({
    visitor: req.body.visitor,
    comment: req.body.comment,
    messageId: req.params.id,
    createDate: Date.now()
  }).save(function(err){
    if(err){
      console.log('save visitor comment fail');
      return;
    }
    console.log('save visitor comment success');
  });
  res.redirect('/users/message/' +  req.params.id);
});

router.post('/comment/:id', function(req, res, next) {
    if (!req.params.id) {
        res.redirect('/');
        return;
    }
    new Comment({
        visitor: req.body.visitor,
        comment: req.body.comment,
        messageId: req.params.id,
        createDate: Date.now()
    }).save( function( err ){
        if (err) {
            console.log('Fail to save to DB.');
            return;
        }
        console.log('Save to DB.');
    });
    res.redirect('/users/message/'+req.params.id);
});

module.exports = router;
