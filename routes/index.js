var express = require('express');
var mysql = require('../mysqldb');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var params={};
  if(!req.session.login){
    req.session.login=false;
  }
  params.session = req.session;


  res.render('index', params);
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  console.log(email);
  if(email){
    mysql.isEmail(email, function(err, results) {
      if(err) {
        res.send(500, "Server Error");
        return;
      }

      var result = results[0];
      var account = email.split("@")[0];

      //계정이 없다면
      if(result.cnt==0){
        mysql.createAccount(account, email, function(err, results) {
          if(err) {
            res.send(500, "Server Error");
          }else{

            req.session = setSession(req.session,email,account,results.insertId,true);
            console.log(req.session);
            res.redirect('/');

          }

        });
      }else{

        req.session = setSession(req.session,email,account,result.idx,true);
        console.log(req.session);
        res.redirect('/');

      }
        //res.redirect('/');
        //return;
    });
  }else{
    res.redirect('/');

  }

});
router.get('/logout', function(req, res, next) {
  req.session = removeSession(req.session);


  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  var params={};
  if(!req.session.login){
    req.session.login=false;
  }
  params.session = req.session;

  res.render('login/index.ejs', params);
});

function setSession(session,email,account,id,login){
  session.email = email;
  session.account= account;
  session.idx = id;
  session.login = login;

  return session;
}

function removeSession(session){
  delete session.email;
  delete session.account;
  delete session.id;
  session.login=false;

  return session;
}

module.exports = router;
