const express = require('express');
const path = require('path');
const fs = require('fs');
const _dataPath = path.join(__dirname,'../../data/events.json');
var router = express.Router();

const _data = JSON.parse(
  fs.readFileSync(_dataPath));

const _events = _data.events;

const searchEvent = (eventname) => new Promise( (resolve, reject) => {
  for (var i = _events.length - 1; i >= 0; i--) {
    if(_events[i].link === eventname){
      resolve(_events[i]);
    }
  }
  reject('Event not found');
})

router.get('/', (req, res, next) => {
  res.render('events',
    {
      events : _events,
      style : 'events.css',
      js : 'events.js',
      title : 'Events | Moksha'
    }
  );
})

router.get('/:eventname', (req, res, next) => {
  const eventname = req.params.eventname;
  searchEvent(eventname)
    .then((event) => {
      console.log(event);
      res.render('event', 
        {
          event : event,
          style : 'event.css',
          js : 'event.js',
          title : event.name
        }
      );
    })
    .catch( (err) => {
      console.log(err);
      res.render("404");
    });
})

module.exports = router;