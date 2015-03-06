

var tty = require('./tty/index.js');

var conf = require('pmx').initModule({
  errors           : false,
  latency          : false,
  versioning       : false,
  show_module_meta : false,
  comment          : 'Module to SSH to servers'
});

var ssh_conf = {
  shell : 'bash',
  users : {},
  port  : conf.port
};

ssh_conf.users[conf.username || 'foo'] = conf.password || 'bar';

var app = tty.createServer(ssh_conf);

app.listen();
