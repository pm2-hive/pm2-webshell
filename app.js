
var tty = require('tty.js');

var http = require('http');

var pmx = require('pmx');

var conf = pmx.initModule();

var probe = pmx.probe();

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

http.get('http://l2.io/ip.js', function(res){
  var str = '';
  var ip;
  var port;

  res.on('data', function (chunk) {
     str += chunk;
     ip = str.match(/\d.*?(?=['])/g)[0];
     port = ssh_conf.port;

     var ipResult = probe.metric({
        name: 'Server Ip',
        value: function() {
          return ip;
        }
      });

     var portResult = probe.metric({
        name: 'Server port',
        value: function() {
          return port;
        }
      });
   });
  
});
