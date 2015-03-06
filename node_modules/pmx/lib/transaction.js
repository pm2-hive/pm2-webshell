
var Proxy     = require('./utils/proxy.js');
var SimpleHttpWrap  = require('./wrapper/simple_http.js');
var Options = require('./pm2_module.js');

var debug = require('debug')('axm:patch');

var Transaction = module.exports = {};

Transaction.http = function(ignore_routes) {
  var Module = require('module');

  //debug('Patching HTTP routes');

  Proxy.wrap(Module, '_load', function(load) {
    return function(file) {
      if (file === 'http' || file === 'https') {

        Options.configureModule({
          latency : true
        });

        return SimpleHttpWrap(ignore_routes || [], load.apply(this, arguments));
      }
      else
        return load.apply(this, arguments);
    };
  });
};



// Transaction.patch = function() {
//   var Module = require('module');

//   debug('Patching');

//   Proxy.wrap(Module, '_load', function(load) {
//     return function(file) {
//       if (file == 'redis') {
//         return RedisWrap(load.apply(this, arguments));
//       }
//       else if (file == 'http') {
//         return HttpWrap(load.apply(this, arguments));
//       }
//       else
//         return load.apply(this, arguments);
//     };
//   });
// };
