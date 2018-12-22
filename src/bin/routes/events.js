const express = require('express');
const path = require('path');
const fs = require('fs');
const _dataPath = path.join(__dirname,'../../data/events.json');
var router = express.Router();

const _data = JSON.parse(
  fs.readFileSync(_dataPath));

const _events = _data.events;

console.log(_events);

router.get('/', (req, res, next) => {
  res.render('events',
    {
      events : _events
    }
  );
})

module.exports = router;