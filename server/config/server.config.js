 
const chalk = require('chalk');
const config = require('./environment/development');

const processApp = process;
let print = console.log; // use not remove build

module['exports'] = function (server) {
  server.startApp = function () {
    server.listen(config.port, config.ip, () => {
      print(chalk['bgBlue'].black("Server listening at http://{0}:{1}, in {2} mode"
        .format(server.address().address, server.address().port, processApp.env['NODE_ENV'])
      ));
    });
  };

  server.on('error', function (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = `Port: ${config.port}`;

    // handle error
    switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      // eslint-disable-next-line no-process-exit
      processApp.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(chalk['bold'](`${bind} is already in use`));
      // eslint-disable-next-line no-process-exit
      processApp.exit(1);
      break;
    default:
      throw error;
    }
  });

  // App crashed event
  // We can handle error here, eg: send mail to report error
  processApp.on('uncaughtException', err => {
    console.error(chalk['bold']('Oops! App Crashed... Reason:'));
    console.error(chalk['red'](err.stack));
    // eslint-disable-next-line no-process-exit
    processApp.exit(0);
  });
};