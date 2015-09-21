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


  var idx= req.query.idx;
  mysql.getUser(idx, function(err, results) {
    if(err) {
      res.send(500, "Server Error");
      return;
    }

    res.json(results);

  });
});

module.exports = router;
