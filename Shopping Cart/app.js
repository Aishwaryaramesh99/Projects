var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var aboutus = require('./routes/about');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const mongoose = require('mongoose');
//You need to have an account created ib mongoose and use connect url directly
mongoose.connect('mongodb+srv://node-js:node-js@cluster0.aj7vv.mongodb.net/node-js?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connect');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
var shoppingSchema = new mongoose.Schema({
  itemname: { type: String }
  , status: { type: String }
});

var Shop = mongoose.model('Shop', shoppingSchema);

app.use('/', indexRouter);
//app.use('/about', aboutus);
//app.use('/users', usersRouter);
app.get('/read' ,
    function (req, res ){
      var shop = new Shop({
        itemname: req.body.itemname
        , status: 'Not Bought'
      });
      Shop.find({'status':'Not Bought' },function(err, items) {
        if (err) return console.error(err);
        console.dir(shop);
        res.render('read', {items:items});
      });
    }
);


app.post( '/create',
    function (req, res ){
      var shop = new Shop({
        itemname: req.body.itemname
        , status: 'Not Bought'
      });
      shop.save(function(err, use) {
        if (err) return console.error(err);
        res.render('message', {
          message: 'New item added'
        });
      });
    }
);

//login







app.post( '/update',function (req, res ){

  var query = {"itemname": req.body.itemname};
  var update = {"status":"Bought"};
  var options = { multi: true};
  Shop.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) return console.error(err);
    console.dir(result);
    res.render('message', {
      message: 'Item updated ' + result
    });
  });
});


app.post( '/delete',
    function (req, res ) {

        Shop.find({itemname: req.body.itemname}).remove().exec(function callback(err, numAffected) {
            res.render('message', {
                message: 'Item updated ' + numAffected
            });

        });
    });
// about page


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

module.exports = app;


