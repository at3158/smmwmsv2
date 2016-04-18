var express = require('express');
var multer  = require('multer');
var router = express.Router();

var upload = multer();

router.get('/', function(req, res, next) {
  req.session.destroy();
  res.end("logout");
  console.log("ok");
});

module.exports = router;
