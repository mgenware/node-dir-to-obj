# node-dir-to-obj

[![Build Status](https://github.com/mgenware/node-dir-to-obj/workflows/Build/badge.svg)](https://github.com/mgenware/node-dir-to-obj/actions)
[![npm version](https://img.shields.io/npm/v/node-dir-to-obj.svg?style=flat-square)](https://npmjs.com/package/node-dir-to-obj)
[![Node.js Version](http://img.shields.io/node/v/node-dir-to-obj.svg?style=flat-square)](https://nodejs.org/en/)

Convert the contents of a directory to an object.

## Installation

```sh
npm i node-dir-to-obj
```

## Usage

Suppose a directory structure like this:

```
a.txt
subDir
-- b.txt
```

```ts
import dirToObj from 'node-dir-to-obj';

const obj = dirToObj('<dir path>');
/*
  {
    'a.txt': '<contents of a.txt>',
    sub: {
      'b.txt': '<contents of a.txt>',
    },
  }
*/
```

### Options

- `ignoreMap` a set of names that should be ignored.
