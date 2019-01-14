const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
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

const createEvent = (_data, _files) => new Promise( (resolve, reject) => {
  var event = {};
  event.rules = [];
  event.heads = [{}];
  for (key in _data) {
    console.log(key);
    if(key.split('_')[0] === 'rule') {
      event.rules.push(_data[key]);
    }
    else {
      if( key.split('_')[0] === 'head') {
        event.heads[0][key.split('_')[1]] = _data[key];
      }
      else {
        event[key] = _data[key];
      }
    }
  }
  event.image = _files.image.name;
  event.link = event.name.split(' ').join('-');

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


const editEvent = (_data, eventlink, event) =>  new Promise( (resolve, reject) => {
  for (var i = _data.events.length - 1; i >= 0; i--) {
    if(_data.events[i].link === eventlink) {
      _data.events[i] = event;
    }
  }

  fs.writeFile(_dataPath, JSON.stringify(_data, null, 4), (err) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve('File Saved');
  })
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


  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.image.path;
    var newpath = path.resolve('src/bin/public/images', files.image.name);
    fs.readFile(oldpath, function (err, data) {
      if (err) throw err;

      fs.writeFile(newpath, data, function (err) {
          if (err) throw err;
      });

      // Delete the file
      fs.unlink(oldpath, function (err) {
          if (err) throw err;
      });
    });
    console.log(fields);

    createEvent(fields, files)
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
});


router.patch('/:eventlink', (req, res, next) => {
  _data = JSON.parse(
    fs.readFileSync(_dataPath));
  _events = _data.events;
  const eventlink = req.params.eventlink;
  editEvent(_data, eventlink, eventData)
  .then((msg) => {
    console.log(msg);
    res.render('Done Editing');
  })
  .catch((err) => {
    console.log(err);
    res.render('Some Error Occured');
  })
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