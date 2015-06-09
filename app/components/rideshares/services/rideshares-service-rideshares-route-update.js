(function (module) {
  'use strict';

  module.factory('RidesharesRouteUpdateSvc', RidesharesRouteUpdateSvc);

  function RidesharesRouteUpdateSvc() {

    return {

      /**
       * Move an Array element up or down in position
       *
       * @param pos1
       * @param pos2
       */

      routeMove: function (pos1, pos2) {

        // local variables
        var i, tmp;

        // cast input parameters to integers
        pos1 = parseInt(pos1, 10);
        pos2 = parseInt(pos2, 10);

        // if positions are different and inside array
        if (pos1 !== pos2 &&
          0 <= pos1 && pos1 <= this.length &&
          0 <= pos2 && pos2 <= this.length) {

          // save element from position 1
          tmp = this[pos1];

          // move element down and shift other elements up
          if (pos1 < pos2) {
            for (i = pos1; i < pos2; i = i + 1) {
              this[i] = this[i + 1];
            }
          }

          // move element up and shift other elements down
          else {
            for (i = pos1; i > pos2; i = i - 1) {
              this[i] = this[i - 1];
            }
          }

          // put element from position 1 to destination
          this[pos2] = tmp;
        }

      },

      /**
       * Returns if an Array element can shift down in position
       *
       * @param route Array
       * @param index Number
       * @returns {boolean}
       */
      canMoveDown: function (route, index) {

        if (+index === 0 && route.length === 1) {
          return false;
        }

        if (+index === route.length - 1) {
          return false;
        }

        return true;

      },

      /**
       * Returns if an Array element can shift down in position
       *
       * @param route Array
       * @param index Number
       * @returns {boolean}
       */
      canMoveUp: function (route, index) {
        if (+index === 0) {
          return false;
        }
        return true;
      },

      /**
       * Removes and item from an Array
       *
       * @param route
       * @param index
       */
      remove: function (route, index) {
        route.splice(index, 1);
      },

      /**
       * Returns an Array's length/size/count
       *
       * @param route
       * @returns {y.length|*|z.length|dummy.length|length|options.length}
       */
      routeTotalPlaces: function (route) {
        return route.length;
      }

    };


  }

})(angular.module('rideshares.services'));
