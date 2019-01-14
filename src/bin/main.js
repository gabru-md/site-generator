const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');


const routes = require('./routes/index');

var app = express();

app.engine('hbs', hbs(
  {
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '/views/layouts')}
  )
);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.home);
app.use('/events', routes.events);
app.use('/contact', routes.contact);
app.use('/reg', routes.volunteers);
app.get('/*', (req, res, next) => {
  res.render('404');
})


app.listen(process.env.PORT || 4000, () => {
  console.log('Server running');
})


/*
const fs = require('fs');
const utils = require('./utils/fsUtils.js')
const PATH = '../build';
let rawFileData = fs.readFileSync('.files.json');
let _file = JSON.parse(rawFileData);

console.log(_file.contact);

let rawContactData = fs.readFileSync(_file.contact);
let _contact = JSON.parse(rawContactData);
console.log(_contact.contacts);

utils.mkdirSync(PATH, 'build');
*/