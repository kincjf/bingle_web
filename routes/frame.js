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

    mysql.getArticleWithUser(photo_id, function(err, results) {
        if(err) {
            res.send(500, "Server Error");
            return;
        }
        results = results[0];
        params.photo_url =results.PHOTO_NAME;
        params.photo_url_preview = results.PHOTO_NAME + "_preview.jpg";
        params.comment =results.COMMENT;
        params.account =results.ACCOUNT;
        params.email =results.EMAIL;

        params.comment = params.comment.split(" ")[0];

        console.log(params);

        res.render('iframe/main', params);


    });



});

module.exports = router;

