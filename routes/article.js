/**
 * Created by yoonsKim on 15. 9. 17..
 */
var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/upload', function(req, res, next) {
    res.render('article/upload');

});

/**
 * 특정 사진 페이지
 */
router.get('/:pid', function(req, res, next) {

    res.render('article/view',{"pid":req.params.pid});
});



module.exports = router;
