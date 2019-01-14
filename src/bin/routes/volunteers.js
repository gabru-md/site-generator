const express = require('express');
const path = require('path');
const fs = require('fs');
const _dataPath = path.join(__dirname,'../../data/reg_volunteers.json');
var router = express.Router();

var _data = JSON.parse(
  fs.readFileSync(_dataPath));


router.get('/volunteers', (req, res, next) => {
  var _data = JSON.parse(
  fs.readFileSync(_dataPath));
  _data = _data.forms;
  console.log(_data);
  res.render('volunteers',
    {
      data : _data,
      style : 'volunteers.css',
      js : 'volunteers.js',
      title : 'MOKSHA | Volunteers'
    }
  );
});


module.exports = router;