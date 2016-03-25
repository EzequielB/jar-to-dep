'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

/**
 * A simple descriptor for jar files located in the local fs.
 */
class JarFileDescriptor {

  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  get fullName() {
    return this.path + "/" + this.name;
  }

  get hash() {
    var shasum = crypto.createHash("sha1");
    var data = fs.readFileSync(this.fullName);
    shasum.update(data);
    return shasum.digest('hex');
  }

}

/**
 * Factory to create @JarFileDescriptor instances from the given fsPath.
 */
class JarFileDescriptorFactory {

  static getDescriptors(fsPath) {
    var stats = fs.lstatSync(fsPath);
    if (stats.isDirectory()) {
      return fs.readdirSync(fsPath)
        .filter(name => name.match(".jar$"))
        .map(fileName => new JarFileDescriptor(fileName, fsPath)
      );
    }
    if (stats.isFile()) {
      return [new JarFileDescriptor(path.basename(fsPath), path.dirname(fsPath))];
    }
    return [];
  }

}

module.exports = JarFileDescriptorFactory;

