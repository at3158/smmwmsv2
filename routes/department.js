var express = require('express');
var multer  = require('multer');
var smmwmsv2 = require('../models/smmwmsv2');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.write('ok');
  // var data1 = smmwmsv2.getOneRecord(res);
  // var data2 = smmwmsv2.getOneRecord(res);
  // data3 = smmwmsv2.extend({},data1,data2);
  // res.json(data1);
  //var page = (req.query.page==undefined)?"1":req.query.page;
  var data = smmwmsv2.getDepartments(res);
  res.send(data);
});
router.post('/create', function(req, res, next) {
  var data = smmwmsv2.setDepartmentCreate(req,res);
  res.send(data);
});
router.post('/delete', function(req, res, next) {
  var data = smmwmsv2.setDepartmentDelete(req,res);
  res.send(data);
});
router.post('/update', function(req, res, next) {
  var data = smmwmsv2.setDepartmentUpdate(req,res);
  res.send(data);
});

module.exports = router;
