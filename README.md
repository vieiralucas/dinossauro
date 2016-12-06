# dinossauro
Dinossauro is a simple way of running the last dynamodb-local version over node

```bash
npm install dinossauro
```

```javascript
// usage with mocha

const dinossauro = require('dinossauro');

describe('my acceptance test', () => {
  before(dinossauro.up);
  after(dinossauro.down);
});
```

```javascript
// dinossauro.up returns a promise that will resolve when dynamo is ready
dinossauro.up()
  .then(dynoDbProcess => {
    // here you can do anything you want with the dynamo process
    dynoDbProcess.stdout.pipe(process.stdoud);
  });
```

```javascript
// dinossauro.up accepts an options object parameter which is passed to dynamo
// the default values follow:
{
  port: 8000,
  inMemory: true,
  sharedDb: true
}

// if you pass an dbPath parameter then inMemory is automatically set to false
{
  dbPath: '/tmp/mydbfolder'
}
```
