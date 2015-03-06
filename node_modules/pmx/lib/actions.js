var debug = require('debug')('axm:events');
var Common    = require('./common.js');

var Actions = {};

Actions.action = function(action_name, opts, fn) {
  if (!fn) {
    fn = opts;
    opts = null;
  }

  if (!action_name)
    return console.error('[PMX] action.action_name is missing');
  if (!fn)
    return console.error('[PMX] emit.data is mission');

  if (!process.send)
    return console.error('[PMX] Action %s will be binded once linked to Keymetrics', action_name);

  // Notify the action
  process.send({
    type : 'axm:action',
    data : {
      action_name : action_name,
      opts        : opts
    }
  });

  function reply(data) {
    process.send({
      type        : 'axm:reply',
      data        : {
        return      : data,
        action_name : action_name
      }
    });
  }

  process.on('message', function(data) {
    if (data && data == action_name)
      return fn(reply);
    return false;
  });

  return false;
};

module.exports = Actions;
