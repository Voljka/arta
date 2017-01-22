var express = require('express');
var app = express();

var port     = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var logger   = require('morgan');
var path = require('path');
var fs = require('fs');
var debug = require('debug')('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log',{flags: 'a'});

if (app.get('env') == 'production') {
  app.use(logger('combined', { /*skip: function(req, res) { return res.statusCode < 400 },*/ stream: accessLogStream }));
} else {
  app.use(logger('dev'));
}

// API

// var apiBase = '/api/v1';

var expressJWT = require('express-jwt')
var secret = { secret: 'my secret' };
// app.use(apiBase, expressJWT(secret).unless({ path: [ apiBase + '/sessions/create']}))

// API route handlers
// var sessions = require('./src/js/api/sessions');

// // API routes
// app.use(apiBase+'/sessions', sessions); // redirect API calls

app.use('/', express.static(__dirname + '/dist')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect bootstrap fonts

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
}); // initial HTML file

app.listen(port);
console.info('Server listening on port: ' + port);
//debug('Server listening on port: ' + port);
