 
'use strict';

 
const path = require('path');


module.exports = function ExpressConfig (app) {
  //Init data in environment production
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, './views'));

};