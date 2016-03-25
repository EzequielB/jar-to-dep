/* eslint-env node, mocha */

var assert = require('assert');
var mockery = require('mockery');
var sinon = require('sinon');

describe('DependencyResolverServiceTest', function() {
  before(function() {
    mockery.enable();
    mockery.registerAllowable('../lib/DependencyResolverService.js');
  });
  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  describe('#asyncResolveDepencency', function() {
    before(function() {
      var restClientMock = {
        registerMethod: function() {},
        methods: {
          queryByHash: function() {}
        }
      };

      sinon.stub(restClientMock.methods, "queryByHash", function(options, responseFunction) {
        responseFunction({
          response: {
            numFound: 0
          }
        });
      });

      mockery.registerMock('node-rest-client', {
        Client: sinon.stub().returns(restClientMock)
      });
    });
    after(function() {
      mockery.deregisterAll();
      mockery.disable();
    });
    it('0 responses resolution', function() {
      var DependencyResolverService = require('../lib/DependencyResolverService.js');

      var service = new DependencyResolverService();

      var jarDescriptorStub = sinon.stub();
      var asyncResolution = service.asyncResolveDepencency(jarDescriptorStub);
      var promise = new Promise(function(resolve) {
        asyncResolution.then(function(resolution) {
          assert(resolution !== null);
          assert(resolution.dependencyDescriptors.length === 0);
          assert(resolution.jarFileDescriptor === jarDescriptorStub);
          resolve();
        });
      });
      return promise;
    });
  });
});
