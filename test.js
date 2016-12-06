'use strict';

const dynamoLocal = require('./index');

dynamoLocal.up()
  .then(dynamoProcess => {
    dynamoLocal.down();

    if (!dynamoProcess.killed) {
      console.error('fail to killed dynamo process');
      return;
    }

    console.log('tests pass');
  })
  .catch(console.error.bind(console));
