
var tty = require('tty.js');

var pmx = require('pmx');
var probe = pmx.probe();

var conf = pmx.initModule({
  widget : {
    type             : 'generic',
    logo             : 'http://www.creativetechs.com/iq/tip_images/TerminalApp-Icon.png',

    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme            : ['#111111', '#1B2228', '#807C7C', '#807C7C'],

    el : {
      probes  : false,
      actions : false
    },

    block : {
      actions : false,
      issues  : false,
      meta    : false,
      cpu: false,
      mem: false,
      main_probes : ['Username', 'Port', 'Bind', 'HTTPS']
    }

    // Status
    // Green / Yellow / Red
  }
});


probe.metric({
  name: 'Port',
  value: function() {
    return conf.port;
  }
});

probe.metric({
  name: 'Username',
  value: function() {
    return conf.username;
  }
});

probe.metric({
  name: 'Bind',
  value: function() {
    return conf.bind;
  }
});

probe.metric({
  name: 'HTTPS',
  value: function() {
    return conf.https;
  }
});

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
