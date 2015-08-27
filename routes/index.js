var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'API Bitch!'});
  res.render('index', { title: 'Express' });
});



module.exports = router;

// FROM

// TO web app
// /api/doors -
// /api/