var express = require('express');
var multer  = require('multer');
var statuses = require('../models/statuses');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  statuses.getStatuses(res);
});
router.post('/create', function(req, res, next) {
  statuses.setStatusCreate(req,res);
});
router.post('/delete', function(req, res, next) {
  statuses.setStatusDelete(req,res);
});
router.post('/update', function(req, res, next) {
  statuses.setStatusUpdate(req,res);
});

module.exports = router;
