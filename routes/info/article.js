var express = require('express');
var mysql = require('../../mysqldb');
var router = express.Router();
var multer  = require('multer');
var request = require('request');
var fs = require('fs');

var makeFolder = require('../../modules/make-resource-folder.js');
var dest = 'uploads/';
var upload = multer({dest:dest});

//router.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});



/* GET home page. */
router.get('/', function(req, res, next) {

  var start= req.query.start;
  var count = req.query.count;
  mysql.getArticleList(start,count, function(err, results) {
    if(err) {
      res.send(500, "Server Error");
      return;
    }

    res.json(results);

  });
});

router.get('/:idx', function(req, res, next) {

  var idx= req.params.idx;
  mysql.getArticle(idx, function(err, results) {
    if(err) {
      res.send(500, "Server Error");
      return;
    }

    res.json(results);

  });
});

router.post('/:account',upload.single('avatar'),function(req, res, next) {

  var account = req.params.account;
  var timestamp = new Date().getTime();
  makeFolder(account, timestamp);


  var new_path = 'resources/'+account+'/'+timestamp+'/'+timestamp;

  fs.rename(req.file.path, new_path+'.jpg', function (err) {
    var body = req.body;
    console.log(err);
    request.post({url:'http://113.198.39.114:3000/board-upload/'+account+'/'+timestamp}, function (err, httpResponse, isSuccessed) {
      //if(isSuccessed=="0"){

        Article(body.user_id,new_path,timestamp,body.content,body.lat,body.lon, function (err, result) {
          if(err){
            res.json(err);
            return;
          }
          var id = result.insertId;
          res.redirect('/p/'+id);
        });
      //}else{
      //  res.redirect('/');
      //}
    });



  });
});

function Article(user_id,p_name,time,comment,lat,lon,callback){

  var art = [user_id,p_name,time,comment,lat,lon];

  mysql.setArticle(art, function(err, results) {
    if(err) {
      callback(err,null);
      return;
    }


    callback(false,results);

  });
}
module.exports = router;
