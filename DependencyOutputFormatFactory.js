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

class MavenDepndencyOuputFormatStrategy extends BaseDependencyOuputFormatStrategy {

  buildComment(comment) {
    return `<!-- ${comment} -->`;
  }

  buildDependencyOutput(dependencyDescriptor) {
    return `<dependency><groupId>${dependencyDescriptor.group}</groupId>` +
      `<artifactId>${dependencyDescriptor.artifact}</artifactId>` +
      `<version>${dependencyDescriptor.version}</version></dependency>`;
  }

}

class CsvDepdendencyOuputFormatStrategy extends BaseDependencyOuputFormatStrategy {

  buildDependencyOutput(dependencyDescriptor) {
    return `'${dependencyDescriptor.group}','${dependencyDescriptor.artifact}','${dependencyDescriptor.version}'`;
  }

}

class DependencyOuputFormatFactoury {

  static strategies() {
    return {
      csv: new CsvDepdendencyOuputFormatStrategy(),
      maven: new MavenDepndencyOuputFormatStrategy(),
      gradle: new GradleDependencyOuputFormatStrategy(),
      object: new JsObjectDependencyOuputFormatStrategy()
    };
  }

  static getFormatStrategy(strategy) {
    return DependencyOuputFormatFactoury.strategies()[strategy];
  }

}

module.exports = DependencyOuputFormatFactoury;
