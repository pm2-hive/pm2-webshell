
# PMX module for Keymetrics I/O

<!-- [![NPM](https://nodei.co/npm-dl/pmx.png?months=3&height=2)](https://nodei.co/npm/pmx/) -->

PMX is a module that allows you to create advanced interactions with Keymetrics I/O.

With it you can:
- Trigger remote actions / functions
- Analyze custom metrics / variables (with utilities like Histogram/Counter/Metric/Meters)
- Report errors (uncaught exceptions and custom errors)
- Emit events
- Analyze HTTP latency

# Installation

![Build Status](https://api.travis-ci.org/keymetrics/pmx.png?branch=master)

Install PMX and add it to your package.json via:

```bash
$ npm install pmx --save
```

Then init the module to monitor HTTP, Errors and diverse metrics.
```javascript
var pmx = require('pmx').init(); // By default everything is enabled and ignore_routes is empty
```
Or choose what to monitor.
```javascript
var pmx = require('pmx').init({
  http          : true,
  errors        : true,
  custom_probes : true,
  ignore_routes : [/socket\.io/, /notFound/]
});
```

# Custom monitoring

## Emit Events

Emit events and get historical and statistics:

```javascript
var pmx = require('pmx');

pmx.emit('user:register', {
  user : 'Alex registered',
  email : 'thorustor@gmail.com'
});
```

## Trigger function from remote

```javascript
var pmx = require('pmx');

pmx.action('db:clean', { comment : 'Description for this action' }, function(reply) {
  clean.db(function() {
    /**
     * reply() must be called at the end of the action
     */
     reply({success : true});
  });
});
```

Note: in case of exceptions in the function, your app will not be affected

## Errors

Catch uncaught exceptions:
```javascript
var pmx = require('pmx').init();
```

Attach more data from errors that happens in Express:
```javascript
var pmx = require('pmx');

app.get('/' ...);
app.post(...);

app.use(pmx.expressErrorHandler());
```

Trigger custom errors:
```javascript
var pmx = require('pmx');

pmx.notify({ success : false });

pmx.notify('This is an error');

pmx.notify(new Error('This is an error'));
```

## HTTP latency analysis

Monitor routes, latency and codes. REST complient.

```javascript
pmx.http(); // You must do this BEFORE any require('http')
```
Ignore some routes by passing a list of regular expressions.
```javascript
pmx.http([/socket\.io/, /notFound/]);
```
This can also be done via pmx.init() by passing the ignore_routes option.
```javascript
pmx.init({
  http          : true,
  ignore_routes : [/socket\.io/, /notFound/]
});
```
**This module is enabled by default if you called pmx with the init() function.**

## Measure

Measure critical segments of you code thanks to 4 kind of probes:

- Simple metrics: Values that can be read instantly
    - Monitor variable value
- Counter: Things that increment or decrement
    - Downloads being processed, user connected
- Meter: Things that are measured as events / interval
    - Request per minute for a http server
- Histogram: Keeps a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution
    - Monitor the mean of execution of a query into database

### Metric

Values that can be read instantly.

```javascript
var probe = pmx.probe();

var metric = probe.metric({
  name  : 'Realtime user',
  value : function() {
    return Object.keys(users).length;
  }
});
```

### Counter

Things that increment or decrement.

```javascript
var probe = pmx.probe();

var counter = probe.counter({
  name : 'Downloads'
});

http.createServer(function(req, res) {
  counter.inc();
  req.on('end', function() {
    counter.dec();
  });
});
```

### Meter

Things that are measured as events / interval.

```javascript
var probe = pmx.probe();

var meter = probe.meter({
  name    : 'req/min',
  seconds : 60
});

http.createServer(function(req, res) {
  meter.mark();
  res.end({success:true});
});
```

#### Options

**seconds** option is the measurement rate of the meter, default is 1 seconds

### Histogram

Keeps a resevoir of statistically relevant values biased towards the last 5 minutes to explore their distribution.

```javascript
var probe = pmx.probe();

var histogram = probe.histogram({
  name        : 'latency',
  measurement : 'mean'
});

var latency = 0;

setInterval(function() {
  latency = Math.round(Math.random() * 100);
  histogram.update(latency);
}, 100);
```

#### Options

**measurement** option can be:

- min: The lowest observed value.
- max: The highest observed value.
- sum: The sum of all observed values.
- variance: The variance of all observed values.
- mean: The average of all observed values.
- stddev: The stddev of all observed values.
- count: The number of observed values.
- median: 50% of all values in the resevoir are at or below this value.
- p75: See median, 75% percentile.
- p95: See median, 95% percentile.
- p99: See median, 99% percentile.
- p999: See median, 99.9% percentile.

## Modules

### Simple app

```
process.env.MODULE_DEBUG = true;

var pmx  = require('pmx');

var conf = pmx.initModule();
```

### Module metadata

In package.json you must at least indicates what is the script to start:
- or with index attribute
- or with bin attribute
- or with the apps attribute + [pm2 capabilities](https://github.com/Unitech/PM2/blob/development/ADVANCED_README.md#a10)

### Configuration

```bash
$ pm2 set <key> <value>
$ pm2 restart <module_name>
```

Values set with `pm2 set` are available in the module environmnent via `process.env.<key>`

# License

MIT
