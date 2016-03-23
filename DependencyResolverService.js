'use strict';

var Client = require('node-rest-client').Client;

class DependencyDescriptor {

  constructor(group, artifact, version) {
    this.group = group;
    this.artifact = artifact;
    this.version = version;
  }

}

class DepencencyResolution {
  constructor(jarFileDescriptor, dependencyDescriptors) {
    this.jarFileDescriptor = jarFileDescriptor;
    this.dependencyDescriptors = dependencyDescriptors;
  }
}

class DependencyResolverService {

  constructor() {
    this.client = new Client();
    this.client.registerMethod("queryByHash", "http://search.maven.org/solrsearch/select", "GET");
  }

  asyncResolveDepencency(jarFileDescriptor) {
    var client = this.client;
    return new Promise(resolve => {
      client.methods.queryByHash({
        parameters: {
          q: `1:"${jarFileDescriptor.hash}"`,
          rows: 20,
          wt: "json"
        }
      }, response => {
        resolve(response);
      });
    }).then(reponse => {
      if (reponse.response.numFound > 0) {
        return reponse.response.docs.map(function(doc) {
          return new DependencyDescriptor(doc.g, doc.a, doc.v);
        });
      }
      return [];
    }).then(dependencyDescriptors => {
      return new DepencencyResolution(jarFileDescriptor, dependencyDescriptors);
    });
  }

}

module.exports = DependencyResolverService;
