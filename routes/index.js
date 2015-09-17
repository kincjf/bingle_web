var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('index', { title: 'Express',msg:'앵귤러를 시작해봅시다' });
});

//특정 유저의 갤러리
router.get('/:id', function(req, res, next) {

  res.json(req.params.id);
  //res.render('index', { title: 'Express',msg:'앵귤러를 시작해봅시다' });
});

//특정 사진 페이지
router.get('/p/:pid', function(req, res, next) {

  res.json(req.params.pid);
  //res.render('index', { title: 'Express',msg:'앵귤러를 시작해봅시다' });
});

module.exports = router;
