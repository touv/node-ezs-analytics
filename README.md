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

## Statements

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [TEEFTFilterMultiFreq](#teeftfiltermultifreq)
    -   [Parameters](#parameters)
-   [TEEFTFilterTags](#teeftfiltertags)
    -   [Parameters](#parameters-1)
-   [TEEFTFrToTagLem](#teeftfrtotaglem)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples)
-   [TEEFTNaturalTag](#teeftnaturaltag)
    -   [Parameters](#parameters-3)
    -   [Examples](#examples-1)
-   [profile](#profile)
    -   [Parameters](#parameters-4)
-   [TEEFTSpecificity](#teeftspecificity)
    -   [Parameters](#parameters-5)
-   [TEEFTStopWords](#teeftstopwords)
    -   [Parameters](#parameters-6)
-   [TEEFTSumUpFrequencies](#teeftsumupfrequencies)
    -   [Parameters](#parameters-7)
-   [TEEFTExtractTerms](#teeftextractterms)
    -   [Parameters](#parameters-8)
-   [TEEFTTokenize](#teefttokenize)
    -   [Parameters](#parameters-9)

### TEEFTFilterMultiFreq

Filter the `data`, keeping only multiterms and frequent monoterms.

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** 
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `multiLimit` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** threshold for being a multiterm (in tokens number) (optional, default `2`)
-   `minFrequency` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** minimal frequency to be taken as a frequent term (optional, default `7`)

### TEEFTFilterTags

Filter the text in input, by keeping only adjectives and names

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** 
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `tags` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Tags to keep (optional, default `['ADJ','NOM']`)

### TEEFTFrToTagLem

Tokenize, tag, and lemmatize a French text

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** 
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `tagTypes` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** tag types (optional, default `['adj','adv','art','con','nom','ono','pre','ver','pro']`)
-   `strictness` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** When false, non-accentuated character are the same as accentuated ones (optional, default `true`)
-   `minimumLength` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Ignore words shorter than this (optional, default `1`)
-   `doTag` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** return tags if true (optional, default `true`)
-   `doLemmatize` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** return lems if true (optional, default `true`)

#### Examples

```javascript
from(['Elle semble se nourrir essentiellement de plancton, et de hotdog.'])
.pipe(ezs('TEEFTFrToTagLem', { doLemmatize: false }))
```

```javascript
[ { id: 0, token: 'elle', tag: [ 'PRO:per' ] },
{ id: 1, token: 'semble', tag: [ 'VER' ] },
{ id: 2, token: 'se', tag: [ 'PRO:per' ] },
{ id: 3, token: 'nourrir', tag: [ 'VER' ] },
{ id: 4, token: 'essentiellement', tag: [ 'ADV' ] },
{ id: 5, token: 'de', tag: [ 'PRE', 'NOM', 'ART:def' ] },
{ id: 6, token: 'plancton', tag: [ 'NOM' ] },
{ id: 7, token: 'et', tag: [ 'CON' ] },
{ id: 8, token: 'de', tag: [ 'PRE', 'NOM', 'ART:def' ] },
{ id: 9, token: 'hotdog', tag: [ 'UNK' ] } ]
```

### TEEFTNaturalTag

POS Tagger from natural

French pos tagging using natural (and LEFFF resources)

#### Parameters

-   `data` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array of tokens (string)
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Array of tokens (object, with `token` and `tag`)

#### Examples

```javascript
{ "token": "dans",      "tag": ["prep"] },
{ "token": "le",        "tag": ["det"]  },
{ "token": "cadre",     "tag": ["nc"] },
{ "token": "du",        "tag": ["det"] },
{ "token": "programme", "tag": ["nc"] }
},
```

### profile

Profile the time a statement takes to execute.

You have to place one to initialize, and a second to display the time it
takes.

#### Parameters

-   `data` **any** 
-   `feed` **any** 

### TEEFTSpecificity

Process objects containing frequency, add a specificity to each object, and
remove all object with a specificity below average specificity (except when
`filter` is `false`).

Can also sort the objects according to their specificity, when `sort` is
`true`.

#### Parameters

-   `data` **any** 
-   `feed` **any** 
-   `weightedDictionary` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the weigthed
    dictionary (optional, default `"Ress_Frantext"`)
-   `filter` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** filter below average specificity (optional, default `true`)
-   `sort` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** sort objects according to their specificity (optional, default `false`)

### TEEFTStopWords

Filter the text in input, by removing stopwords in lemma

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** 
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 
-   `stopwords` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the stopwords file to use (optional, default `'StopwFrench'`)

### TEEFTSumUpFrequencies

Sums up the frequencies of identical lemmas from different chunks,
and yield as last object { totalFrequencies }.

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** 
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### TEEFTExtractTerms

-   **See: <https://github.com/istex/sisyphe/blob/master/src/worker/teeft/lib/termextractor.js>**

Regroup multi-terms when possible (noun + noun, adjective + noun, _etc_.),
and computes statistics (frequency, _etc_.).

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** tagged terms
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
-   `nounTag` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** noun tag (optional, default `'NOM'`)
-   `adjTag` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** adjective tag (optional, default `'ADJ'`)
-   `keys` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{lemma:'lemma',token:'word',tag:'pos'}`)

### TEEFTTokenize

-   **See: <http://yomguithereal.github.io/talisman/tokenizers/words>**

Extract tokens from a text

#### Parameters

-   `data` **[Stream](https://nodejs.org/api/stream.html)** 
-   `feed` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 
