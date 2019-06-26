# jar-to-dep
[![Build Status](https://travis-ci.org/EzequielB/jar-to-dep.svg?branch=master)](https://travis-ci.org/EzequielB/jar-to-dep)

Given a set of jar files tries to find the proper dependency on maven central by hash search. Prints the results either as gradle or maven dependency format, or csv.

### Installation
```npm install jar-to-dependency -g```

### Usage
```
$jar-to-dep -h
Usage: jar-to-dep [options]

Options:

-h, --help             output usage information
-p, --path <path>      the path of a jar or where to scan for jars
-f, --format <format>  the format of the ouput [gradle|maven|csv]
-v, --verbose          prints the failed jars or those having multiple possible dependencies
```

### Example

```
$ jar-to-dep --path /path/to/jars/mysql-connector.jar 
compile group: 'mysql', name: 'mysql-connector-java', version: '5.1.21'

$ jar-to-dep --path /path/to/jars/ -f maven
<dependency><groupId>mysql</groupId><artifactId>mysql-connector-java</artifactId><version>5.1.21</version></dependency>
```
