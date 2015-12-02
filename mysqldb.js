/**
 * Created by yoonsKim on 15. 9. 17..
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '113.198.39.114',
    port : 3306,
    user : 'panophoto',
    password : 'pano113!!@',
    database : 'mydb'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
    console.log('connected mysql');

});

exports.getRecords = function(city, callback) {
    var sql = "SELECT * FROM mydb.LOCALE_CODE;";
    // get a connection from the pool
    connection.query(sql, function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};

exports.getArticleList = function(start, count, callback) {
    var sql = "SELECT p.IDX_PK idx, u.IDX_PK user_idx, p.PHOTO_NAME, UPLOAD_TIME, COMMENT, GPS_LAT,GPS_LNG,ACCOUNT,LOCALE_CODE_FK FROM mydb.PHOTO p left join USER u on p.USER_FK = u.IDX_PK order by p.IDX_PK desc limit ?,?;";
    start = parseInt(start);
    count = parseInt(count);

    connection.query(sql,[start,count], function (err,rows) {
        //console.log(err);
        var row;
        row = rows;
        //console.log(row);
        callback(false,row);

    });
};

exports.getArticle = function(idx, callback) {
    var sql = "SELECT * FROM PHOTO WHERE IDX_PK=?";
    // get a connection from the pool
    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};
exports.getArticleWithUser = function(idx, callback) {
    var sql = "SELECT * FROM mydb.PHOTO left join USER on PHOTO.USER_FK = USER.IDX_PK where PHOTO.IDX_PK=?";
    // get a connection from the pool
    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};

exports.setArticle = function(param, callback) {
    var sql = "INSERT INTO PHOTO (USER_FK, PHOTO_NAME, UPLOAD_TIME,COMMENT,GPS_LAT,GPS_LNG) VALUES (?, ?, ?, ?, ?, ?);";
    // get a connection from the pool
    connection.query(sql,param, function (err,rows) {
        var row;
        row = rows;
        callback(err,row);

    });
};

exports.getUser = function(idx, callback) {
    var sql = "SELECT * FROM USER WHERE IDX_PK=?";
    // get a connection from the pool

    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};
exports.isEmail = function(email, callback) {
    var sql = "SELECT COUNT(*) cnt,IDX_PK idx FROM USER WHERE EMAIL=?";
    // get a connection from the pool
    connection.query(sql,[email], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};
exports.createAccount = function(account, email, callback) {
    var sql = "INSERT INTO USER (ACCOUNT, EMAIL) VALUES (?, ?);";
    // get a connection from the pool
    connection.query(sql,[account, email], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};