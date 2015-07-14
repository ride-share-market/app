(function () {
  'use strict';

  describe('App Routes', function () {

    describe('State', function () {

      beforeEach(module('app.routes'));

      var $state;

      beforeEach(inject(function (_$state_) {
        $state = _$state_;
      }));

      it('should return all of the state configs', function (done) {

        var list = $state.get().sort(function (a, b) {
          return (a.name > b.name) - (b.name > a.name);
        });

        list.sort();

        var names = [
          '', // implicit root state
          'home',
          '404',
          'error',
          'about',
          'privacy',
          'terms',
          'contact'
        ].sort();

        expect(list.map(function (state) {
          return state.name;
        })).to.eql(names);

        done();

      });

    });

    describe('URL params clean up', function () {

      var $locationMock = {
        protocol: function() {
          return 'https';
        },
        port: function() {
          return 80;
        },
        host: function() {
          return 'website.com';
        },
        url: function() {
          return '/';
        },
        absUrl: function () {
          return 'http://website.com?utm_source=email&utm_medium=mobilecpc&utm_campaign=ads/#!/';
        },
        path: function() {
          return '/about';
        },
        search: function() {
          return {
            key1: 'value1',
            key2: 'value2'
          };
        }
      };

      beforeEach(module('app.routes', function ($provide) {
        $provide.value('$location', $locationMock);
        $provide.value('$window', {});

      }));

      var $rootScope,
        $state,
        $window;

      beforeEach(inject(function (_$rootScope_, _$state_, _$window_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $window = _$window_;
      }));

      it('should redirect without non Angular URL params', function () {

        var toState = {
          url: '/create'
        };

        var toParams = {};

        var fromState = {
          name: 'home'
        };

        $rootScope.$broadcast('$stateChangeStart', toState, toParams, fromState);

        $window.location.should.equal('https://website.com/#!/about?key1=value1&key2=value2');

      });

    });

  });

})();
