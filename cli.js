#!/usr/bin/env node
'use strict';

// TODO: add support for ouput option (-o fileToWrite)

var program = require('commander');
var JarToDependency = require('./JarToDependency.js');

program
  .option('-p, --path <path>', 'the path of a jar or where to scan for jars')
  .option('-f, --format <format>',
    'the format of the ouput [gradle|maven|csv]')
  .option('-v, --verbose', 'prints the failed jars or those having multiple possible dependencies')
  .parse(process.argv);
try {
  if (!program.path) {
    throw new Error('--path required');
  }
  if (program.format && !(/^(gradle|maven|csv)$/i).test(program.format)) {
    throw new Error('--format invalid');
  }
  if (!program.format) {
    program.format = "gradle";
  }

  var jarToDep = new JarToDependency();
  jarToDep.resolve({
    path: program.path,
    out: process.stdout,
    format: program.format,
    verbose: Boolean(program.verbose)
  });
} catch (error) {
  process.stdout.write("Error: " + error.message + "\n");
  program.outputHelp();
}
