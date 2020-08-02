var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create');
  next();
});
/*
router.get('/read' ,
    function (req, res ){
      const shop = new Shop({
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


router.post( '/create',
    function (req, res ){
      const shop = new Shop({
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







router.post( '/update',function (req, res ){

  const query = {"itemname": req.body.itemname};
  const update = {"status": "Bought"};
  const options = {multi: true};
  Shop.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) return console.error(err);
    console.dir(result);
    res.render('message', {
      message: 'Item updated ' + result
    });
  });
});


router.post( '/delete',
    function (req, res ){

      Shop.find({ itemname:req.body.itemname }).remove().exec(function callback (err, numAffected) {
        if (err) return console.error(err);
        console.dir(numAffected);
        res.render('message', {
          message: 'Item updated ' + numAffected
        });
      });

    });

 */

module.exports = router;
