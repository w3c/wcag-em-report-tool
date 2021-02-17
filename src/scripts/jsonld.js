import jsonld from 'jsonld/lib/jsonld.js';

function getItems(ldon) {
  return ldon['@graph'] || [ldon];
}

export default {
  compact: jsonld.compact,
  expand: jsonld.expand,
  flatten: jsonld.flatten,
  frame: jsonld.frame,
  getItems,
  parseValue: (property) => property,
  sanitizeContext: (data) => data
};
