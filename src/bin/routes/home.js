const express = require('express');
const path = require('path');
const fs = require('fs');
const _dataPath = path.join(__dirname,'../../data/home.json');
var router = express.Router();

const _data = JSON.parse(
  fs.readFileSync(_dataPath)).data;


router.get('/', (req, res, next) => {
  res.render('index',
    {
      data : _data,
      style : 'style.css',
      js : 'home.js'
    }
  );
});


module.exports = router;