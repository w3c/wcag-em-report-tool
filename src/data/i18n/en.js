/**
 * @todo:
 *  - Find a more practical way of
 *    binding the locales together.
 *    Either with a rollup plugin or custom script.
 *    Translators should only touch locales,
 *    and or App configuration...🤦‍♂️
 */

import menubar from '../../locales/en/components/menubar.json';
import startRoute from '../../locales/en/routes/index.json';

export default {
  MENUBAR: menubar,
  start: startRoute
};
