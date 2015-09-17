var express = require('express');
var mysql = require('../../mysqldb');
var router = express.Router();


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
    console.log('come');
    if(err) {
      res.send(500, "Server Error");
      return;
    }
    console.log(results);
    res.json(results);
    });
});

module.exports = router;
