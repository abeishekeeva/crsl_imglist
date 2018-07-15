const createError = require('http-errors');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Pool, Client } = require('pg');
const $ = require('jquery');
const cheerio = require('cheerio');
const fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));



app.get('/:crslid', function(req, res) {

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'first_db',
        password: '123123123',
        port: 5432,
    })


    const results = [];

    var imgSrc = '';
    client.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {

            client.query('select i.img_src from public."Images" i, public."Carousel" c where i.img_crsl_id = c.crsl_id and c.crsl_id =' + req.params.crslid + ';', (err, res) => {
                if (err) {
                    console.log(err)
                } else

                    for (let each in res.rows) {
                        results.push(res.rows[each]);
                    }
                    client.end();
            })
        }
    })

    client.on('end', function() {


        fs.readFile('index.html', function(err, data) {
            var $ = cheerio.load(data);
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

})




app.listen(3001, () => console.log('Example app listening on port 3000!'))


//module.exports = app;
