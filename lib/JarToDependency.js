'use strict';

var JarFileDescriptorFactory = require('./JarFileDescriptorFactory.js');
var DependencyResolverService = require('./DependencyResolverService.js');
var DependencyOutputFormatFactory = require('./DependencyOutputFormatFactory.js');

class JarToDependency {

  constructor() {
    this.dependencyResolverService = new DependencyResolverService();
  }

  resolve(options) {
    var jarDescriptors = JarFileDescriptorFactory.getDescriptors(options.path);
    var resolutionPromises = jarDescriptors
      .map(descriptor => this.dependencyResolverService.asyncResolveDepencency(descriptor));

    Promise.all(resolutionPromises).then(resolutions => {
      resolutions.forEach(function(resolution) {
        var outputStrategy = DependencyOutputFormatFactory.getFormatStrategy(options.format);
        if (resolution.dependencyDescriptors.length === 1) {
          options.out.write(outputStrategy.buildDependencyOutput(resolution.dependencyDescriptors[0]) + "\n");
          return;
        }
        if (!options.verbose) {
          return;
        }
        if (resolution.dependencyDescriptors.length === 0) {
          options.out.write(outputStrategy.buildComment(`Dependency not found for file ${resolution.jarFileDescriptor.fullName}`) + "\n");
          return;
        }
        options.out.write(outputStrategy.buildComment(`Multiple matching dependencies found for file ${resolution.jarFileDescriptor.fullName}`) + "\n");
        resolution.dependencyDescriptors
          .map(desc => outputStrategy.buildCommentedDependencyOutput(desc))
          .forEach(commentedDep => options.out.write(commentedDep + "\n"));
      });
    });
  }
}

module.exports = JarToDependency;
