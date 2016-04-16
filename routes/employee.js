var express = require('express');
var multer  = require('multer');
var smmwmsv2 = require('../models/smmwmsv2');
var router = express.Router();

var upload = multer();

router.get('/page', function(req, res, next) {
  var data = smmwmsv2.getEmployees(req,res);
  res.send(data);
});
router.get('/page/:page', function(req, res, next) {
  var data = smmwmsv2.getEmployees(req,res);
  res.send(data);
});
router.post('/create', function(req, res, next) {
  var data = smmwmsv2.setEmployeeCreate(req,res);
  res.send(data);
});
router.post('/delete', function(req, res, next) {
  var data = smmwmsv2.setEmployeeDelete(req,res);
  res.send(data);
});
router.post('/update', function(req, res, next) {
  var data = smmwmsv2.setEmployeeUpdate(req,res);
  res.send(data);
});

module.exports = router;
