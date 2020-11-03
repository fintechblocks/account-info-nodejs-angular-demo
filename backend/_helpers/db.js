'use strict';

const mongoose = require('mongoose');

let mongo_connection = {
  uri: process.env.MONGO_CONNECTION || 'mongodb://localhost',
  options: {
    ssl: false,
    checkServerIdentity: false,
    sslValidate: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: 30000 // every 30 seconds
  },
  debug: process.env.MONGODB_DEBUG || false
};

mongoose.connection = createConnection();
process.on('SIGTERM', cleanup).on('SIGINT', cleanup);

function createConnection(serviceId, callback) {
  callback = callback || function () { };
  serviceId = serviceId || 'common';
  let uri = mongo_connection.uri;

  const connection = mongoose.createConnection(uri, mongo_connection.options, function (err) {
    if (err) {
      throw err;
    }
    console.log(`Successfully connected to MongoDB (${serviceId})`);
    callback(null);
  });

  connection.on('disconnected', function () {
    throw new Error(`Connection lost to MongoDB. (${serviceId}`);
  });

  return connection;
}

function cleanup() {
  console.info(`Closing connections (Total: ${Object.keys(mongoose.connection.connections).length})`);

  async.each(Object.keys(mongoose.connection.connections), function (serviceId, callback) {
    mongoose.connection.connections[serviceId].removeAllListeners('disconnected');
    mongoose.connection.connections[serviceId].close(function () {
      console.info(`Disconnected ${serviceId}`);
      callback();
    });
  }, function () {
    mongoose.disconnect();
    console.info("Closed all connections, exiting");
    process.exit(0);
  }
  );
}

module.exports = {
  User: require('../users/user.model')
};
