// import express
const express = require('express');
const app = express();
const http = require('http');
// import Stringbuilder. Viết ngắn hơn  
const StringBuilder = require('stringbuilder');
StringBuilder.extend('string');
const bodyParser = require('body-parser');

//
const routeIndex = require('./server/routes/index.route');
app.use(express.static('./server/public'));
app.set('view engine', 'ejs');
app.set('views', './server/views');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', routeIndex);

// import config mongo
const config = require('./server/config/environment/development');

const config_mongo_connect = require('./server/config/database/mongo.config')
// create server
const server = http.createServer(app);

// import mongoose 
const mongoose = require('mongoose');
// const expressConfig = require('./server/config/express.config');
const connectSocket =  require('./server/socket/socket.config');
// connect.
// expressConfig(app);
config_mongo_connect(config, mongoose);
connectSocket(server)

// register configuration
// RegisterApi(app);

//run app
require('./server/config/server.config')(server);
server.startApp();
module.exports = app;