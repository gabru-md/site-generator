const express = require('express');
const path = require('path');
const fs = require('fs');
const _dataPath = path.join(__dirname,'../../data/contact.json');
var router = express.Router();

const _contact = JSON.parse(
  fs.readFileSync(_dataPath));


router.use('/', (req, res, next) => {
  res.render('contact',
  {
    contact : _contact,
    style : 'contact.css',
    js : 'contact.js',
    title : 'Contact | Moksha'
  }
  );
});


module.exports = router;