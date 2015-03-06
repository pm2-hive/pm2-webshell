
var debug     = require('debug')('axm:events');
var Transport = require('./utils/transport.js');
var Common    = require('./common.js');

var Events    = {};

Events.emit = function(name, data) {
  if (!name)
    return console.error('[AXM] emit.name is missing');
  if (!data)
    return console.error('[AXM] emit.data is missing');

  data.__name = name;

  Transport.send({
    type : 'human:event',
    data : data
  }, true);
  return false;
};

module.exports = Events;
