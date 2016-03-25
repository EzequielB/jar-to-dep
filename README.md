# jar-to-dep
Simple tool to transform jars files into managed dependencies using a resolver service (currently maven central support only)

### Installation
```npm install jar-to-dep -g```

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