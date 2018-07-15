const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const $ = require('jquery');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

const db = require('./db.js');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

var html = '<!DOCTYPE html>\n' + '<html>\n' + '<head>\n' + '    <meta charset="UTF-8">\n' +
    '    <title>Sample Site</title>\n' + '\n' +
    '    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">\n' +
    '    <link rel="stylesheet" href="./stylesheets/style.css">\n' +
    '    <style>\n' +
    '        body { padding-top:30px; }\n' +
    '    </style>\n' +
    '</head>\n' +
    '<body>\n' + '\n' +
    '<div>\n' +
    '    <h1 style="text-align: center;" class="jumbotron"> </h1>\n' +
    '    <div id="imgbox" class="container">\n' +
    '        <div >\n' + '\n' + '        </div>\n' +
    '    </div>\n' + '</div>\n' + '\n' + '</body>\n' +
    '</html>'


app.get('/:crslid', function(req, res) {

    const results = [];

    db.query('select i.img_src from public."Images" i, public."Carousel" c where i.img_crsl_id = c.crsl_id and c.crsl_id =' + req.params.crslid + ';', (err, result) => {
        if (err) {
            console.log('connection error', err.stack)
        } else

            for (let each in result.rows) {
                results.push(result.rows[each]);
            }

            var $ = cheerio.load(html);
            $('h1').text('Image List for Carousel ' + req.params.crslid);
            $('h1').addClass('welcome');

            for (let i in results) {
                var img = "<img src=" + results[i]["img_src"] + ">";
                $('#imgbox').prepend(img);
            }

            res.set('Content-Type', 'text/html; charset=utf-8');
            res.send($.html());

    })
})


module.exports = app;
