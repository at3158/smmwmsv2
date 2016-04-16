var express = require('express');
var multer  = require('multer');
var warehouses = require('../models/warehouses');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  warehouses.getWareHouses(res);
});
router.post('/create', function(req, res, next) {
  warehouses.setWareHouseCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  warehouses.setWareHouseDelete(req,res);
});
router.post('/update', function(req, res, next) {
  warehouses.setWareHouseUpdate(req,res);
});

module.exports = router;
