
var pmx = require('..');

function fork() {
  var app = require('child_process').fork(__dirname + '/fixtures/module/module.fixture.js', [], {
    env : {
      'module' : '{ "option1" : "value1", "option2" : "value2" }'
    }
  });
  return app;
}

describe('PMX module', function() {
  var app;
  var action_name;

  it('should emit a new action', function(done) {
    // 1 - It should emit an action
    app = fork();

    app.once('message', function(dt) {

      /**
       * Right event sent
       */
      dt.type.should.eql('axm:option:configuration');

      /**
       * Options set
       */
      dt.data.show_module_meta.should.exists;
      dt.data.description.should.eql('comment');
      dt.data.module_version.should.eql('1.0.0');
      dt.data.module_name.should.eql('module');

      /**
       * Configuration succesfully passed
       */
      dt.data.option1.should.eql('value1');
      dt.data.option2.should.eql('value2');
      done();
    });
  });

});
