var express = require('express');
var multer  = require('multer');
var stocks = require('../models/stocks');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  stocks.getStocks(res);
});
router.post('/create', function(req, res, next) {
  stocks.setStockCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  stocks.setStackDelete(req,res);
});
router.post('/update', function(req, res, next) {
  stocks.setStackUpdate(req,res);
});

module.exports = router;
