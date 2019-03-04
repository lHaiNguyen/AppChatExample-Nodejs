 'use strict';

 let print = console.log;

 module.exports = async function connectionDb(config, mongoose) {
   const uri = await String.format("mongodb://{0}:{1}/{2}",
     config.mongodb.server_config.host,
     config.mongodb.server_config.port,
     config.mongodb.dbName);

   let isConnectedBefore = false;

   connect();

   function connect() {
     if (isConnectedBefore) {
       console.info('Database reconnecting...');
     } else {
       console.info('Connecting to Database...');
     }
     mongoose.connect(uri, {
       useNewUrlParser: true
     });
   }

   mongoose.connection.on('error', function (err) {
     print('Could not connect to MongoDB: ', err);
   });

   mongoose.connection.on('disconnected', function () {
     print('Database has lost connection...');
     if (!isConnectedBefore) {
       setTimeout(connect, 5000);
     }
   });

   mongoose.connection.on('connected', function () {
     isConnectedBefore = true;
     print(`Database: ${config.mongodb.dbName}, host:${config.mongodb.server_config.host} has connected success!`);
   });

   mongoose.connection.on('reconnected', function () {
     print('Database has reconnected!');
   });

   process.on('SIGINT', function () {
     mongoose.connection.close(function () {
       print('Mongoose default connection disconnected through app terminal!');
       // eslint-disable-next-line no-process-exit
       process.exit(0);
     });
   });
 }