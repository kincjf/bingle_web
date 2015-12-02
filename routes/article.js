/**
 * Created by yoonsKim on 15. 9. 17..
 */
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var request = require('request');
var fs = require('fs');
var mysql = require('../mysqldb');

var makeFolder = require('../modules/make-resource-folder.js');
var dest = 'uploads/';
var upload = multer({dest:dest});


/* GET home page. */
router.get('/upload', function(req, res, next) {
    var params={};
    if(!req.session.login){
        req.session.login=false;
        res.redirect('/');
    }else{
        params.session = req.session;

        res.render('article/upload',params);
    }

});
router.post('/upload',upload.single('avatar'),function(req, res, next) {
    var params={};
    if(!req.session.login){
        req.session.login=false;
        res.redirect('/');
        return;
    }
    var user_id = req.session.idx;
    var account = req.session.account;
    console.log(req.session);



    var timestamp = new Date().getTime();
    makeFolder(account, timestamp);



    var new_path = 'resources/'+account+'/'+timestamp+'/'+timestamp;

    fs.rename(req.file.path, new_path+'.jpg', function (err) {
        var body = req.body;

        request.post({url:'http://113.198.39.114/board-upload/'+account+'/'+timestamp}, function (err, httpResponse, isSuccessed) {
            console.log("request");
            //if(isSuccessed=="0"){

            console.log(user_id,new_path,timestamp,body.content,body.lat,body.lon);
            Article(user_id,new_path,timestamp,body.content,body.lat,body.lon, function (err, result) {
                console.log(user_id);
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

/**
 * 특정 사진 페이지
 */
router.get('/:pid', function(req, res, next) {
    var params={};
    if(!req.session.login){
        req.session.login=false;
    }
    params.session = req.session;
    params.pid=req.params.pid;
    mysql.getArticleWithUser(params.pid, function(err, results) {
        if(err) {
            res.send(500, "Server Error");
            return;
        }
        results = results[0];
        params.photo_url =results.PHOTO_NAME;
        params.comment =results.COMMENT;
        params.account =results.ACCOUNT;
        params.email =results.EMAIL;

        console.log(params);

        res.render('article/view',params);

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
