# prefixed-id
Generates random ids with a prefix (like Stripe)

Based on [id-generator](https://github.com/auth0/id-generator) by Auth0.

## Installing
```
npm install prefixed-id
```

## Using
Simple case:
```javascript
var PrefixedId = require('prefixed-id');

var generator = new PrefixedId();
var id = generator.new('cus');

console.log(id); // cus_lO1DEQWBbQAACfHO
```

Predefined set of allowed prefixes (to avoid mistakes):
```javascript
var PrefixedId = require('prefixed-id');

var generator = new PrefixedId(['cus', 'con']);
var id = generator.new('cus');

console.log(id); // cus_lO1DEQWBbQAACfHO

generator.new('cli'); // throws
```

> [stackabuse.com](http://stackabuse.com) &nbsp;&middot;&nbsp;
> Twitter [@ScottWRobinson](https://twitter.com/scottwrobinson) &nbsp;&middot;&nbsp;
> GitHub [@ScottWRobinson](https://github.com/scottwrobinson)