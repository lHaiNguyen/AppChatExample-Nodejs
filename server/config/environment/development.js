'use strict';

/*configuration specific production*/

module['exports'] = {
  mongodb: {
    server_config: {
      host: 'localhost',
      port: 27017
    },
    dbName: 'MongoChat',
  },
  port: 3000,
}
