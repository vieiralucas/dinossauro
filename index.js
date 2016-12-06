const Bluebird = require('bluebird');
const _ = require('lodash');
const spawn = require('child_process').spawn;
const path = require('path');
const net = require('net');

let dynamoProcess;

const defaultOptions = {
  port: 8000,
  inMemory: true,
  sharedDb: true
};

const up = (options = {}) => new Promise((resolve, reject) => {
  options = _.defaults(options, defaultOptions);

  if (dynamoProcess) {
    reject(new Error('There is already an dynamo process running'));
  }

  const args = [
    '-Djava.library.path=./DynamoDBLocal_lib/',
    '-jar',
    'DynamoDBLocal.jar'
  ];

  if (options.dbPath) {
    args.push('-dbPath ' + options.dbPath);
  } else if (options.inMemory) {
    args.push('-inMemory');
  }

  if (options.shareDb) {
    args.push('-sharedDb');
  }

  dynamoProcess = spawn('java', args, { cwd: path.join(__dirname, 'dynamo') });

  const tryConnect = cb => () => {
    const client = net.connect({ port: options.port }, cb);

    client.on('error', tryConnect(cb));
  };

  tryConnect(() => {
    resolve(dynamoProcess);
  })();
});

const down = () => {
  if (dynamoProcess && dynamoProcess.kill) {
    dynamoProcess.kill('SIGTERM');
    dynamoProcess = undefined;
  }
};

module.exports = { up, down };
