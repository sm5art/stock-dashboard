//dependencies
var express = require('express');
path = require('path'),
app = express(),
port = 1234,
bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var passport = require('passport');
var flash = require('connect-flash')
var expressSession = require('express-session');
var events = require('events');
//socket.io
var scraper = require("./scraper");
var io = require('socket.io');

io.on('connection',function(socket){
  scraper.on('update',function(object){
    console.log(object);
  });
});

//db connection
mongoose.connect('mongodb://localhost/norum');

//configs
require('./config/passport')(passport);

//middleware
app.use(expressSession({secret: 'mySecretKey'}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

//set views and engines and routing
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./routes/router')(app,passport);
app.get('*', function(req, res) {
    res.json({
        'route': 'Sorry this page does not exist!'
    });
});
app.listen(port);
console.log("server running on port "+port)
