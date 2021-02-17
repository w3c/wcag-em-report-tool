const URL_REGEXP = /((https?):\/\/)([\da-z.-]+)\.([a-z.]{2,6})([-\w\d@:%_+.~#?,&//=]+)/g;

export function isURL(url) {
  try {
    new URL(url);
  } catch (error) {
    console.error(error.message);
    return false;
  }

  return true;
}

export function getURL(text) {
  if (typeof text !== 'string') {
    console.warn(
      '[getURL]: Expected argument to be of type string, but got “${typeof text}”'
    );
    return null;
  }

  const matches = text.match(URL_REGEXP);

  if (matches) {
    return new URL(matches[0]).href;
  } else {
    return null;
  }
}

export function hasURL(text) {
  if (typeof text !== 'string') {
    console.warn(
      `[hasURL]: Expected argument to be of type string, but got “${typeof text}”`
    );
    return false;
  }

  const matches = text.match(URL_REGEXP);

  if (matches) {
    return true;
  }

  return false;
}

export function toHTTP(url) {
  if (!isURL(url)) {
    console.error('[forceHTTP]: Expected a valid url as input');

    return url;
  } else {
    return url.replace('https:', 'http:');
  }
}
