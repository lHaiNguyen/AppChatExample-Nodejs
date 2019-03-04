'use strict';

const _ = require('lodash');
const node_env = process.env.NODE_ENV = process.env.NODE_ENV || process.argv[2] || 'production';

// process.env = _['merge'](process.env, require(`./config/environment/sdk-secret/${node_env}.env.js`));

if (node_env === 'development' || node_env === 'local') {
  require('babel-register');
  require('babel-polyfill');
}

exports = module['exports'] = require('./app');
