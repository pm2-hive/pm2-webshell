

var tty = require('tty.js');

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
  port  : conf.port,
  "hostname": "127.0.0.1",
  "limitGlobal": 10000,
  "limitPerUser": 1000,
  "term": {
    "termName": "xterm",
    "geometry": [180, 70],
    "scrollback": 1000,
    "visualBell": false,
    "popOnBell": false,
    "cursorBlink": false,
    "screenKeys": false,
    "colors": [
      "#2e3436",
      "#cc0000",
      "#4e9a06",
      "#c4a000",
      "#3465a4",
      "#75507b",
      "#06989a",
      "#d3d7cf",
      "#555753",
      "#ef2929",
      "#8ae234",
      "#fce94f",
      "#729fcf",
      "#ad7fa8",
      "#34e2e2",
      "#eeeeec"
    ]
  }
};

ssh_conf.users[conf.username || 'foo'] = conf.password || 'bar';

if (conf.https && JSON.parse(conf.https) == true) {
  ssh_conf['https'] = {
    "key": "./term-default.key",
    "cert": "./term-default.crt"
  };
}

var app = tty.createServer(ssh_conf);

app.listen();
