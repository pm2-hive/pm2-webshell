
var axm = require('..');

axm.action('test', function(reply) {
  console.log('Action test called from external process');
  reply({ res : 'hello moto'});
});
