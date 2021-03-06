var express = require('express');
var multer  = require('multer');
var departments = require('../models/departments');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  departments.getDepartments(res);
});
router.post('/create', function(req, res, next) {
  departments.setDepartmentCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  departments.setDepartmentDelete(req,res);
});
router.post('/update', function(req, res, next) {
  departments.setDepartmentUpdate(req,res);
});

module.exports = router;
