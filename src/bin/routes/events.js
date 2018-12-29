const express = require('express');
const path = require('path');
const fs = require('fs');
const _dataPath = path.join(__dirname,'../../data/events.json');
var router = express.Router();

var _data, _events;

const searchEvent = (eventname) => new Promise( (resolve, reject) => {
  for (var i = _events.length - 1; i >= 0; i--) {
    if(_events[i].link === eventname){
      resolve(_events[i]);
    }
  }
  reject('Event not found');
});

const createEvent = (_data) => new Promise( (resolve, reject) => {
  var event = {};
  for (key in _data) {
    if( _data[key].constructor === Array) {
      continue;
    }

    if( ((_data[key].constructor === String) || (__data[key].constructor === Object))
        && (! _data[key])) {
      reject('Not enough Data');
    }

    event[key] = _data[key];
  }

  resolve(event);
});

const saveEvent = (_data, event) => new Promise( (resolve, reject) => {
  _data.events.push(event);
  fs.writeFile(_dataPath, JSON.stringify(_data, null, 4), (err) => {
    if(err) {
      console.log(err);
      reject(err);
    }
    resolve("File Saved");
  });
});


router.get('/', (req, res, next) => {
  _data = JSON.parse(
  fs.readFileSync(_dataPath));
  _events = _data.events;
  res.render('events',
    {
      events : _events,
      style : 'events.css',
      js : 'events.js',
      title : 'Events | Moksha'
    }
  );
});

router.get('/add_event', (req, res, next) => {
  res.render('add_event',
      {
        style : 'add_event.css',
        js : 'add_event.js',
        title : 'Add Event | Moksha'
      }
    );
});


router.post('/add_event', (req, res, next) => {
  _data = JSON.parse(
    fs.readFileSync(_dataPath));

  createEvent(req.body)
    .then((event) => {
      saveEvent(_data, event)
        .then((msg) => {
          console.log(msg);
          res.send('Done');
        })
        .catch((err) => {
          console.log(err);
          res.send('Cannot save! Please check the console');
        })
    })
    .catch((err) => {
      console.log(err);
      res.send('Incomplete Data');
    });
});


router.get('/:eventname', (req, res, next) => {
  _data = JSON.parse(
    fs.readFileSync(_dataPath));
  _events = _data.events;
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
});




module.exports = router;