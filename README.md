# Site-Generator

This is a fest site generator for colleges.
The project proposes templating using handlebars to achieve the goal of a site. This will reduce the amount of manual labour and literally anyone can update the contents* of the website.

(*) contents means the data to be rendered, the frontend for the site still needs to be designed by people. 

## How to set up?

1. Git clone this repository and `cd` into it
2. Install the dependencies
4. Hit `npm run start`
5. Navigate to `localhost:8080` to access the server

```
$~ git clone https://github.com/gabru-md/site-generator.git
$~ cd site-generator
$~ npm install
$~ npm run start
```


### Available Routes

1. http://localhost:8080/
    Homepage Route. This route will render the information predominantly stored in `src/data/home.json`
2. http://localhost:8080/contact
    Route to display contact information. The information comprises of the core team of the fest.
    The data of the core team can be found in the `src/data/contact.json`
3. http://localhost:8080/events
    Route to display all the events of the fest at a single page (mostly required).
    The data about the events is stored inside the `src/data/events.json` file
4. http://localhost:8080/events/:eventname
    Route to display individual event. The event details can be found inside the `src/data/events.json` file.


### Issues/Bugs

Please report any bugs or issues on the issue tracker or reach me at `manish.nsit8@gmail`.

## Maintainer
**gabru-md**