# Teeft adapted to French language

This package cannot be used alone. [ezs](https://www.npmjs.com/package/ezs) has to be installed

## Usage

```js
import ezs from 'ezs';
import teeftfr from 'ezs-teeftfr';

ezs.use(teeftfr);

process.stdin
    .pipe(ezs('STATEMENT_NAME', { STATEMENT_PARAMETERS })
    .pipe(process.stdout);
```

# Statements

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [count](#count)
    -   [Parameters](#parameters)

## count

Take `Object` object getting some fields with json path, and do ...

### Parameters

-   `data`  
-   `feed`  
-   `path` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
