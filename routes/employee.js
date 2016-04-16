var express = require('express');
var multer  = require('multer');
var employees = require('../models/employees');
var router = express.Router();

var upload = multer();

router.get('/page', function(req, res, next) {
  employees.getEmployees(req,res);
});
router.get('/page/:page', function(req, res, next) {
  employees.getEmployees(req,res);
});
router.post('/create', function(req, res, next) {
  employees.setEmployeeCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  employees.setEmployeeDelete(req,res);
});
router.post('/update', function(req, res, next) {
  employees.setEmployeeUpdate(req,res);
});

module.exports = router;
