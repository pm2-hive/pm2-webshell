
var debug     = require('debug')('axm:events');
var Transport = require('./utils/transport.js');
var path      = require('path');
var fs        = require('fs');
var util      = require('util');

var Options = {};

Options.configureModule = function(opts) {
  if (!this.running) {
    this.running = true;
    /* Avoid automatic exit of the script */

    setInterval(function() {}, 1000);
  }

  Transport.send({
    type : 'axm:option:configuration',
    data : opts
  }, false);
};

/**
 * Load config and merge with data from package.json
 */
Options.loadConfig = Options.initModule = function(conf) {
  var package_filepath = path.resolve(path.dirname(require.main.filename), 'package.json');

  if (!conf) conf = {};

  conf = util._extend(conf, {
    errors           : false,
    latency          : false,
    versioning       : false,
    show_module_meta : false
  });

  /**
   * Merge package.json metadata
   */
  try {
    var package_json = require(package_filepath);

    conf.module_version = package_json.version;
    conf.module_name    = package_json.name;
    conf.description    = package_json.description;
  } catch(e) {
    throw new Error('[PMX] package.json problem (not found or mal formated', e);
  }

  /**
   * If custom variables has been set, merge with returned configuration
   */
  try {
    if (process.env[package_json.name])
      conf = util._extend(conf, JSON.parse(process.env[package_json.name]));
  } catch(e) {
    console.error('Error while parsing configuration in environment (%s)', package_json.name);
  }

  Options.configureModule(conf);

  return conf;
};

Options.getPID = function(file) {
  if (typeof(file) === 'number')
    return file;
  return parseInt(fs.readFileSync(file).toString());
};

module.exports = Options;
