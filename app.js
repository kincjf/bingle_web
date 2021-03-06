var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var board = require('./routes/board');
var boardUpload = require('./routes/board-upload');
var frame = require('./routes/frame');

var article = require('./routes/article');
var cookieParser = require('cookie-parser');

//var session = require('cookie-session');
var session = require('express-session');

var info_user = require('./routes/info/user');
var info_article= require('./routes/info/article');
var lessMiddleware = require('less-middleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cors());        // Access-Control-Allow-Origin

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use('/resources', express.static('resources'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(lessMiddleware('/less', {
    dest: '/css',
    pathRoot: path.join(__dirname, 'public'),
    compress:true,
    prefix:"/css",
    force:true
}));

//set session
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'copycat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }
}));

app.use('/', routes);
app.use('/board', board);
app.use('/board-upload', boardUpload);
app.use('/i/user', info_user);
app.use('/i/article', info_article);
app.use('/export', frame);

app.use('/p', article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
