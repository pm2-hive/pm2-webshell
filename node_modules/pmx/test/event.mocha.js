
var axm = require('..');

function fork() {
  return require('child_process').fork(__dirname + '/event.mock.js', []);
}

describe('Event', function() {
  it('should have properties', function(done) {
    axm.should.have.property('emit');
    done();
  });

  it('should send event when called', function(done) {
    var app = fork();

    app.once('message', function(data) {
      data.type.should.eql('human:event');
      console.log(app.pid);
      console.log('killing process');
      process.kill(app.pid);
      done();
    });
  });

});
