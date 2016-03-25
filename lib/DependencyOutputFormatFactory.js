'use strict';

class BaseDependencyOuputFormatStrategy {

  buildCommentedDependencyOutput(dependencyDescriptor) {
    return this.buildComment(this.buildDependencyOutput(dependencyDescriptor));
  }

  buildComment(comment) {
    return `Commented -> ${comment}`;
  }
}

class JsObjectDependencyOuputFormatStrategy extends BaseDependencyOuputFormatStrategy {

  buildDependencyOutput(dependencyDescriptor) {
    return `compile group: '${dependencyDescriptor.group}', name: '${dependencyDescriptor.artifact}', version: '${dependencyDescriptor.version}'`;
  }

}

class GradleDependencyOuputFormatStrategy extends BaseDependencyOuputFormatStrategy {

  buildComment(comment) {
    return `// ${comment}`;
  }

  buildDependencyOutput(dependencyDescriptor) {
    return `compile group: '${dependencyDescriptor.group}', name: '${dependencyDescriptor.artifact}', version: '${dependencyDescriptor.version}'`;
  }

}

class MavenDependencyOuputFormatStrategy extends BaseDependencyOuputFormatStrategy {

  buildComment(comment) {
    return `<!-- ${comment} -->`;
  }

  buildDependencyOutput(dependencyDescriptor) {
    return `<dependency><groupId>${dependencyDescriptor.group}</groupId>` +
      `<artifactId>${dependencyDescriptor.artifact}</artifactId>` +
      `<version>${dependencyDescriptor.version}</version></dependency>`;
  }

}

class CsvDepedendencyOutputFormatStrategy extends BaseDependencyOuputFormatStrategy {

  buildDependencyOutput(dependencyDescriptor) {
    return `'${dependencyDescriptor.group}','${dependencyDescriptor.artifact}','${dependencyDescriptor.version}'`;
  }

}

class DependencyOuputFormatFactory {

  static strategies() {
    return {
      csv: new CsvDepedendencyOutputFormatStrategy(),
      maven: new MavenDependencyOuputFormatStrategy(),
      gradle: new GradleDependencyOuputFormatStrategy(),
      object: new JsObjectDependencyOuputFormatStrategy()
    };
  }

  static getFormatStrategy(strategyName) {
    var strategy = DependencyOuputFormatFactory.strategies()[strategyName];
    return strategy === undefined ? null : strategy;
  }

}

module.exports = DependencyOuputFormatFactory;
