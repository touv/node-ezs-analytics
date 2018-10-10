import R from 'ramda';
import { someBeginsWith } from './filter-tags';

/**
 * Regroup multi-terms when possible (noun + noun, adjective + noun, *etc*.),
 * and computes statistics (frequency, *etc*.).
 *
 * @see https://github.com/istex/sisyphe/blob/master/src/worker/teeft/lib/termextractor.js
 * @export
 * @param {Stream}  data tagged terms
 * @param {Array<string>}   feed
 * @param {string}  [nounTag='NOM']  noun tag
 * @param {string}  [adjTag='ADJ']   adjective tag
 */
export default function TEEFTExtractTerms(data, feed) {
    if (this.isLast()) {
        return feed.close();
    }
    const nounTag = this.getParam('nounTag', 'NOM');
    const adjTag = this.getParam('adjTag', 'ADJ');
    const isNoun = R.curry(someBeginsWith)([nounTag]);
    const isAdj = R.curry(someBeginsWith)([adjTag]);
    const taggedTerms = R.clone(data)
        .map(term => ({ ...term, tag: Array.isArray(term.tag) ? term.tag : [term.tag] }));
    const termFrequency = {};
    let multiterm = [];
    const termSequence = [];
    const SEARCH = Symbol('SEARCH');
    const NOUN = Symbol('NOUN');
    let state = SEARCH;
    taggedTerms
        .forEach((taggedTerm) => {
            const tags = taggedTerm.tag;
            const norm = taggedTerm.token;
            if (state === SEARCH && (isNoun(tags) || isAdj(tags))) {
                state = NOUN;
                multiterm.push(norm);
                termSequence.push(taggedTerm.token);
                termFrequency[norm] = (termFrequency[norm] || 0) + 1;
            } else if (state === NOUN && (isNoun(tags) || isAdj(tags))) {
                multiterm.push(norm);
                termSequence.push(taggedTerm.token);
                termFrequency[norm] = (termFrequency[norm] || 0) + 1;
            } else if (state === NOUN && !isNoun(tags) && !isAdj(tags)) {
                state = SEARCH;
                if (multiterm.length > 1) {
                    const word = multiterm.join(' ');
                    termSequence.push(word);
                    termFrequency[word] = (termFrequency[word] || 0) + 1;
                }
                multiterm = [];
            }
        });
    // If a multiterm was in progress, we save it
    if (multiterm.length > 1) {
        const word = multiterm.join(' ');
        termSequence.push(word);
        termFrequency[word] = (termFrequency[word] || 0) + 1;
    }

    // Compute `length` (number of words) and frequency
    // @param termSequence
    const computeLengthFrequency = R.reduce((acc, word) => {
        acc[word] = {
            frequency: termFrequency[word],
            length: word.split(' ').length,
        };
        return acc;
    }, {});

    // Merge taggedTerms and value (length and frequency) of words (output of
    // computeLengthFrequency)
    const mergeTagsAndFrequency = (lengthFreq, token) => R.merge(
        { ...lengthFreq, token },
        R.find(taggedTerm => taggedTerm.token === token, taggedTerms),
    );

    // Add tags to terms
    const addTags = R.mapObjIndexed(mergeTagsAndFrequency);
    // NOTE: FilterTag is applied *after* TermExtractor

    const result = R.pipe(computeLengthFrequency, addTags)(termSequence);

    R.map(item => feed.write(item), result);
    feed.end();
}
