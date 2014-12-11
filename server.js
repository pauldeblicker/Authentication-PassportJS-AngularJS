//Modules ======================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var session = require ('express-session');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

//Configuration ================================================================
//Db config
var db = require('./config/db');
mongoose.connect(db.url);
//Port config
var port = process.env.PORT || 8080;
//Passport config
require('./config/passport')(passport);
//App config
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type : ' application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'test', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

//Routes =======================================================================

require('./app/routes')(app, passport);

//Start App ====================================================================

app.listen(port);
console.log('The server started well on port: ' + port);
