// import wcag data here
import WCAG20 from '../wcag/WCAG20.json';
import WCAG21 from '../wcag/WCAG21.json';

const wcag = {
  '2.1': WCAG21,
  '2.0': WCAG20
};

/* For every new wcag 2.x version,
 * add an entry for “only in new version” here.
 */
Object.keys(wcag).reverse().reduce((previous, current, index) => {
  // Skip first
  if (index === 0) {
    return current;
  }

  const newInCurrent = wcag[current].filter(
    (currentSc) => !wcag[previous].some((previousSc) => currentSc.num === previousSc.num)
  );

  wcag[`${current}+`] = newInCurrent;
}, '');


export const CONFORMANCE_LEVELS = ['A', 'AA', 'AAA'];

export const VERSIONS = ['2.1', '2.0'];

export default wcag;
