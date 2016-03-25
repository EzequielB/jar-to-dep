/* eslint-env node, mocha */

var assert = require('assert');
var DependencyOutputFormatFactory = require('../lib/DependencyOutputFormatFactory.js');

describe('DependencyOutputFormatFactoryTest', function() {
  describe('#getFormatStrategy', function() {
    it('should map strategies correctly', function() {
      var gradle = DependencyOutputFormatFactory.getFormatStrategy("gradle");
      assert(gradle !== null);
      assert(gradle.constructor.name === "GradleDependencyOuputFormatStrategy");

      var maven = DependencyOutputFormatFactory.getFormatStrategy("maven");
      assert(maven !== null);
      assert(maven.constructor.name === "MavenDependencyOuputFormatStrategy");

      var csv = DependencyOutputFormatFactory.getFormatStrategy("csv");
      assert(csv !== null);
      assert(csv.constructor.name === "CsvDepedendencyOutputFormatStrategy");

      var other = DependencyOutputFormatFactory.getFormatStrategy("invalid type");
      assert(other === null);
    });
  });
});
