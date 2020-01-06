angular
  .module('wcagReporter')
  .service('isObjectLiteral', function () {
    /**
     * isObjectLiteral tests if parameter is an object literal like:
     * {
     *  key1: value1,
     *  …,
     *  keyN: valueN
     * }
     * @param  {any}  test [parameter to test]
     * @return {Boolean}
     */
    function isObjectLiteral (test) {
      if (
        typeof test === 'object' &&
        Object.prototype.toString.call(test) === '[object Object]'
      ) {
        return true;
      }

      return false;
    }

    return isObjectLiteral;
  });
