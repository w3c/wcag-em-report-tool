import jsonld from 'jsonld/lib/jsonld.js';

export default {
  compact: jsonld.compact,
  expand: jsonld.expand,
  flatten: jsonld.flatten,
  frame: jsonld.frame,
  parseValue: (property) => property,
  sanitizeContext: (data) => data
};
