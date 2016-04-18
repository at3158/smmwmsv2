var express = require('express');
var multer  = require('multer');
var statuses = require('../models/statuses');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  statuses.getItems(res);
});
router.get('/page/:page', function(req, res, next) {
  statuses.getItems(req,res);
});
router.get('/item/:item', function(req, res, next) {
  statuses.getItem(req,res);
});
router.post('/create', function(req, res, next) {
  statuses.setItemCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  statuses.setItemDelete(req,res);
});
router.post('/update', function(req, res, next) {
  statuses.setItemUpdate(req,res);
});

module.exports = router;
