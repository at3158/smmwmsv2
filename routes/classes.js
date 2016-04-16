var express = require('express');
var multer  = require('multer');
var classes = require('../models/classes');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  classes.getClasses(res);
});
router.post('/create', function(req, res, next) {
  classes.setClassCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  classes.setClassDelete(req,res);
});
router.post('/update', function(req, res, next) {
  classes.setClassUpdate(req,res);
});

module.exports = router;
