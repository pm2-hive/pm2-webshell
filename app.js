
var tty = require('modified-tty.js');

var conf = require('pmx').initModule();

var ssh_conf = {
  shell : 'bash',
  users : {},
  port  : parseInt(conf.port),
  "hostname": conf.bind,
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

ssh_conf.users[conf.username] = conf.password;

if (JSON.parse(conf.https) === true) {
  ssh_conf['https'] = {
    "key": "./term-default.key",
    "cert": "./term-default.crt"
  };
}

var app = tty.createServer(ssh_conf);

app.listen();
