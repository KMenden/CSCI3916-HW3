var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');

var app = express();
app.use(bodyParser.text({
    type: function (req) {
        return 'text';
    }
}));

app.use(passport.initialize());
var router = express.Router();

app.get('/get', function(req, res) {
    console.log(req.body);
    res = res.status(200);
    if (req.get('Content-Type')) {
        console.log("Content-Type: " + req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
    }
    res.json({
        EnvrionmentKey : process.env.UNIQUE_KEY,
        RequestBody : req.body,
        RequestHeaders : req.headers,
        RequestQuery : Object.keys(req.query).length !== 0 ? req.query : "No Queries Found"
    });
    // res.send(res.json);
});

app.post('/post', function(req, res) {
    console.log(req.body);
    res = res.status(200);
    if (req.get('Content-Type')) {
        console.log("Content-Type: " + req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
    }
        res.json({
            EnvrionmentKey : process.env.UNIQUE_KEY,
            RequestBody : req.body,
            RequestHeaders : req.headers,
            RequestQuery : Object.keys(req.query).length !== 0 ? req.query : "No Queries Found"
        });

   // res.send(res.json);
});

app.put('/put', function(req, res) {
    console.log(req.body);
    res = res.status(200);
    if (req.get('Content-Type')) {
        console.log("Content-Type: " + req.get('Content-Type'));
        res = res.type(req.get('Content-Type'));
    }
    res.json({
        EnvrionmentKey : process.env.UNIQUE_KEY,
        RequestBody : req.body,
        RequestHeaders : req.headers,
        RequestQuery : Object.keys(req.query).length !== 0 ? req.query : "No Queries Found"
    });
    // res.send(res.json);
});

router.route('/delete')
    .delete(authController.isAuthenticated, function(req, res) {
        console.log(req.body);
        res = res.status(200);
        if (req.get('Content-Type')) {
            console.log("Content-Type: " + req.get('Content-Type'));
            res = res.type(req.get('Content-Type'));
        }
        res.json({
            EnvrionmentKey : process.env.UNIQUE_KEY,
            RequestBody : req.body,
            RequestHeaders : req.headers,
            RequestQuery : Object.keys(req.query).length !== 0 ? req.query : "No Queries Found"
        });
        // res.send(res.json);
        }
    );
/*
app.delete('/delete', function(req, res) {


});*/

app.use('/', router);
app.use('*', function(req, res, next) {
    console.log("Invalid Request Detected, Sending back Error Response");

    res.status(405);
    res.statusCode = 405;

    res.send("Error: HTTP Method not supported")

});



http.createServer(app).listen(process.env.PORT || 8080);