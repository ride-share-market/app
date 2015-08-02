(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Sort Country', function () {

      beforeEach(module('rideshares.services'));

      // Load fixture data
      beforeEach(module('fixture/200-get-rideshares-9-items.json'));

      var $scope,
        RidesharesSortCountrySvc;

      beforeEach(inject(function ($rootScope, _RidesharesSortCountrySvc_) {
        $scope = $rootScope.$new();
        RidesharesSortCountrySvc = _RidesharesSortCountrySvc_;
      }));

      it('should sort by country count, then country alphabetically', function () {

        inject(function (fixture200GetRideshares9Items) {

          var googleChartData = RidesharesSortCountrySvc.googleChartData(fixture200GetRideshares9Items.rideshares);

          googleChartData[0].c[0].v.should.equal('United States');
          googleChartData[0].c[1].v.should.equal(2);

          googleChartData[1].c[0].v.should.equal('Australia');

          googleChartData[8].c[0].v.should.equal('United Kingdom');

        });

      });

    });

  });

})();
