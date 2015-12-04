/**
 * Created by rupertKim on 2015. 12. 4..
 */
var express = require('express');
var mysql = require('../mysqldb');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var params = {};
    var photo_id = req.query.id;
    mysql.getArticle(photo_id, function (err, result_article) {
        var result_article = result_article[0];
        params.photo_url = result_article.PHOTO_NAME;
        res.render('iframe/main', params);

    });




});

module.exports = router;
