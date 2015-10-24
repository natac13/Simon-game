The project is a the last Intermediate project challenge from [Free Code Camp](http://freecodecamp.com) 

### Gulpfile
In this project I have explored the use of [browserify](https://www.npmjs.com/package/browserify) and [babelify](https://www.npmjs.com/search?q=babelify) to compile to one file. Had a 'Not a stream' problem with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) after going through [browersify] but fixed it with [gulp-streamify](https://www.npmjs.com/package/gulp-streamify). 

### JavaScript
Wrote all the files in ES6 and discovered that I did not have to transpile before testing, and in fact the [Jasmine](http://jasmine.github.io/) test files can be written in ES6.
The file that is used for bundling is `main.js` which import what it need and will setup the click handlers.

### Express
I am learning Express.js right now so I did make this into an express app which I have deployed on [Heroku app](https://damp-shore-6239.herokuapp.com/)
I need to recall having to make the `Profile` file which Heroku needs. I launch the app from the `bin/www` file.

### CSS 
I have used Sass and Compass to help handle the CSS. I am currently (October 2015) learning these preprocessors. I set up a `base.scss` which just imports everything else. Then have `_setup.scss` handle establishing the baseline font size and color variables.