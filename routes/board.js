/**
 * Created by yoonsKim on 15. 9. 17..
 */
var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var router = express.Router();
/* GET home page. */

router.get('/', function(req, res, next) {


    res.render('index', { title: 'Express',msg:'앵귤러를 시작해봅시다' });
});




module.exports = router;