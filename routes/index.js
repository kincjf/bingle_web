var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


  //res.json({a:"sss"});

  res.render('index', { title: 'Express',msg:'앵귤러를 시작해봅시다' });
});

module.exports = router;
