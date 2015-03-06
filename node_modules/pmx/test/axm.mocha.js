
var axm = require('..');

function fork() {
  var app = require('child_process').fork(__dirname + '/proc.mock.js', []);
  return app;
}

describe('AXM driver', function() {
  it('should have the right properties', function(done) {
    axm.should.have.property('emit');
    axm.should.have.property('action');
    done();
  });

  describe('Event module', function() {
    it('should not hang if process not forked', function(done) {
      axm.emit('testo', { data : 'ok' });
      done();
    });

  });

  describe('Action module', function() {
    var app;
    var action_name;

    it('should emit a new action', function(done) {
      // 1 - It should emit an action

      app = fork();

      app.once('message', function(dt) {
        dt.type.should.eql('axm:action');
        action_name = dt.data.action_name;
        done();
      });
    });

    it('should trigger the action', function(done) {
      app.once('message', function(dt) {
        dt.type.should.eql('axm:reply');
        dt.data.return.res.should.eql('hello moto');
        done();
      });

      app.send(action_name);

    });

    it('should not trigger the action if wrong action name', function(done) {
      app.once('message', function(dt) {
        throw new Error('Should not be called');
      });

      app.send({
        action_name : 'im unknown'
      });

      setTimeout(done, 200);
    });
  });

});
