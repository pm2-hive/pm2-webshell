
var axm = require('..');

setInterval(function() {
  axm.emit('test', {
    user : 'toto'
  });
}, 100);
