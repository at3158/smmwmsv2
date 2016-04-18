var express = require('express');
var multer  = require('multer');
var login = require('../models/logins');
var router = express.Router();

var upload = multer();

router.post('/', function(req, res, next) {
  login.getEmployee(req,res);
});

module.exports = router;
