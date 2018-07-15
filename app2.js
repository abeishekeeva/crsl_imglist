const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Pool, Client } = require('pg')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.get('/', (req, res) =>
    res.send("hello world")
)


app.listen(3002, () => console.log('Example app listening on port 3000!'))


module.exports = app;
