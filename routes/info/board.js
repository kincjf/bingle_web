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

  mysql.getRecords("San Francisco", function(err, results) {
    console.log('come');
    if(err) {
      res.send(500, "Server Error");
      return;
    }
      // Respond with results as JSON
    res.json(results);
    });
  //res.render('index', { title: 'Express',msg:'앵귤러를 시작해봅시다' });
});

module.exports = router;
