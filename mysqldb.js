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
    var sql = "SELECT * FROM mydb.PHOTO p left join USER u on p.USER_FK = u.IDX_PK order by p.IDX_PK desc limit ?,?;";
    start = parseInt(start);
    count = parseInt(count);
    console.log(sql);
    connection.query(sql,[start,count], function (err,rows) {
        console.log(err);
        var row;
        row = rows;
        console.log(row);
        callback(false,row);

    });
};

exports.getArticle = function(idx, callback) {
    var sql = "SELECT * FROM PHOTO WHERE IDX_PK=?";
    // get a connection from the pool
    console.log('test');
    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};

exports.getUser = function(idx, callback) {
    var sql = "SELECT * FROM USER WHERE IDX_PK=?";
    // get a connection from the pool
    console.log('test');
    connection.query(sql,[idx], function (err,rows) {
        var row;
        row = rows;

        callback(false,row);

    });
};