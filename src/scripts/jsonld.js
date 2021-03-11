import jsonld from 'jsonld/lib/jsonld.js';

import { getURL, toHTTP } from '@app/scripts/urls.js';

function getItems(ldon) {
  if (!ldon) {
    return [];
  }

  return ldon['@graph'] || [ldon];
}

function getType(item) {
  let { type } = item;

  if (!Array.isArray(type)) {
    type = [type];
  }

  return type;
}

function hasType(item, types) {
  const itemType = getType(item);

  if (!itemType) {
    return false;
  }

  if (!Array.isArray(types)) {
    types = [types];
  }

  return types.some((type) => {
    return itemType.indexOf(type) >= 0;
  });
}

function isCompactIRI(str) {
  const regexp = /([\w\d]+|_)/g;
  const matched = str.match(regexp);

  return matched ? true : false;
}

function setIdFromProperties(item, properties) {
  const newItem = {...item};
  const url = properties.reduce((href, property) => {
    const value = newItem[property];
    if (href) {
      return href;
    }

    const newURL = getURL(value);

    return newURL ? newURL.href : null;
  }, null);

  if (url) {
    newItem.id = url;
  }

  return newItem;
}

export default {
  compact: jsonld.compact,
  expand: jsonld.expand,
  flatten: jsonld.flatten,
  frame: jsonld.frame,
  getItems,
  getType,
  getValue: (property) => property,
  hasType,
  isCompactIRI,
  setIdFromProperties
};
