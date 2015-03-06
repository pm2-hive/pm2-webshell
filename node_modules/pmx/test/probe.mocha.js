
var axm = require('..');

function fork() {
  var app = require('child_process').fork(__dirname + '/fixtures/probe.fixture.js', []);
  return app;
}

function forkHistogram() {
  var app = require('child_process').fork(__dirname + '/fixtures/histogram.fixture.js', []);
  return app;

}
describe('Probe', function() {
  it('should have the right properties', function(done) {
    axm.should.have.property('probe');

    var probe = axm.probe();

    probe.should.have.property('meter');
    probe.should.have.property('metric');
    probe.should.have.property('histogram');
    probe.should.have.property('counter');
    done();
  });

  it('should fork app and receive data', function(done) {
    var app = fork();

    app.on('message', function(pck) {
      pck.type.should.eql('axm:monitor');
      pck.data.should.have.properties('req/min', 'Realtime user', 'random', 'Cheerio');

      //console.log(pck);

      if (pck.data.random &&
          pck.data.Cheerio == false &&
          pck.data.Downloads > 1) {
        app.kill();
        done();
      }
    });
  });

  it('should fork app and receive data', function(done) {
    var app = forkHistogram();

    app.on('message', function(pck) {
      pck.type.should.eql('axm:monitor');

      //console.log(pck);

      if (pck.data.mean &&
          pck.data.min &&
          pck.data.test) {
        app.kill();
        done();
      }
    });
  });


})
