var tty = require('./index.js');

var app = tty.createServer({
  shell: 'bash',
  users: {
    foo: 'bar'
  },
  port: 8000
});

app.listen();
