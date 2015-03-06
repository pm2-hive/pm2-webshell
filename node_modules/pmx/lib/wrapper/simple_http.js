
var Proxy     = require('../utils/proxy.js');
var Transport = require('../utils/transport.js');
var Probe     = require('../Probe.js');

var gl_meter, gl_latency;

var HttpWrap = module.exports = function(ignore_routes, http) {

  gl_meter = Probe.probe().meter({
    name    : 'HTTP',
    seconds : 60,
    unit    : 'req/s'
  });

  gl_latency = Probe.probe().histogram({
    measurement : 'mean',
    name        : 'pmx:http:latency',
    unit        : 'ms'
  });

  var ignoreRoutes = function(url) {
    for (var i = 0; i < ignore_routes.length; ++i) {
      if (url.match(ignore_routes[i]) != null) {
        return true;
      }
    }
    return false;
  };

  Proxy.wrap(http.Server.prototype, ['on', 'addListener'], function(addListener) {
    return function(event, listener) {

      if (!(event === 'request' && typeof listener === 'function'))
        return addListener.apply(this, arguments);

      return addListener.call(this, event, function(request, response) {
        var self = this;
        var args = arguments;

        gl_meter.mark();

        var http_start = {
          url    : request.url,
          method : request.method,
          start  : Date.now(),
          ip     : request.headers['x-forwarded-for'] ||
            (request.connection ? request.connection.remoteAddress : false) ||
            (request.socket ? request.socket.remoteAddress : false) ||
            ((request.connection && request.connection.socket) ? request.connection.socket.remoteAddress : false) || ''
        };

        response.once('finish', function() {

          if (((Date.now() - http_start.start) >= 200
             || response.statusCode >= 500)
             && !ignoreRoutes(http_start.url)) {

            gl_latency.update(Date.now() - http_start.start);

            Transport.send({
              type : 'http:transaction',
              data : {
                url        : http_start.url,
                method     : http_start.method,
                time       : Date.now() - http_start.start,
                code       : response.statusCode,
                ip         : http_start.ip,
                size       : response.getHeader('Content-Length') || null
              }
            });
          }

          http_start = null;
        });

        return listener.apply(self, args);
      });
    };
  });
  return http;
};
