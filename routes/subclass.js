var express = require('express');
var multer  = require('multer');
var subclasses = require('../models/subclasses');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  subclasses.getSubClasses(res);
});
router.post('/create', function(req, res, next) {
  subclasses.setSubClassCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  subclasses.setSubClassDelete(req,res);
});
router.post('/update', function(req, res, next) {
  subclasses.setSubClassUpdate(req,res);
});

module.exports = router;
