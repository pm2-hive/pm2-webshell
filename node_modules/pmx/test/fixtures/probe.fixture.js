
var axm = require('../..');

var probe = axm.probe();

var users = {
  'alex'  : 'ok',
  'musta' : 'fa'
};

/**
 * Monitor synchronous return of functions
 */
var rt_users = probe.metric({
  name : 'Realtime user',
  value : function() {
    return Object.keys(users).length;
  }
});

/**
 * Monitor value
 */
var cheerio = probe.metric({
  name : 'Cheerio',
  value : true
});

/**
 * Meter for HTTP
 */
var meter = probe.meter({
  name    : 'req/min',
  seconds : 60
});

var http  = require('http');

http.createServer(function(req, res) {
  meter.mark();
  res.end('Thanks');
}).listen(3400);

/**
 * Meter example
 */

var meter2 = probe.meter({
  name    : 'random',
  unit    : 'rd',
  seconds : 1
});

setInterval(function() {
  meter2.mark(Math.random() * 100);
}, 10);


setTimeout(function() {
  cheerio.set(false);
  counter.inc();
}, 1100);

/**
 * Counter
 */

var counter = probe.counter({
  name : 'Downloads'
});

counter.inc();
counter.dec();
counter.inc();
counter.inc();

console.log(cheerio.val());
setInterval(function() {
  console.log(counter.val());
  console.log(meter.val());
  console.log(meter2.val());
  console.log(rt_users.val());
  console.log(cheerio.val());
}, 1500);
