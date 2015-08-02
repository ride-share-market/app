(function (module) {
  'use strict';

  module.factory('RidesharesSortCountrySvc', RidesharesSortCountrySvc);

  function RidesharesSortCountrySvc($window) {

    var R = $window.R;

    function getItineraryCountries() {

      var pickPlaces = function (place) {
        return place;
      };

      var pickAddressComponents = function (place) {
        return place.details.address_components;
      };

      var pickCountryAddressComponent = function (addressComponents) {
        return R.contains('country', addressComponents.types);
      };

      var pickCountryLongName = function (addressComponent) {
        return addressComponent.long_name;
      };

      // Get a unique list of countries for a single rideshare.
      // Ex: Melbourne to Sydney Australia = Australia (one country)
      // Ex: Texas to Mexico City = United States and Mexico (two countries)
      return R.compose(
        R.uniq,
        R.map(pickCountryLongName),
        R.filter(pickCountryAddressComponent),
        R.flatten,
        R.map(pickAddressComponents),
        R.map(pickPlaces),
        R.prop('route'),
        R.prop('itinerary')
      );

    }

    function buildGoogleChartData(countries, countryCount) {
      var res = [];
      countries.forEach(function (country) {
        // {c:[{v: 'United States'}, {v: 11}]}
        res.push({
          c: [
            {v: country},
            {v: countryCount[country]}
          ]
        });
      });
      return res;
    }

    function googleChartData(rideshares) {

      var sortByCountryName = function (a, b) {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      };

      var sortByCount = function (a, b) {
        return a.c[1].v - b.c[1].v;
      };

      // Iterate over all rideshares and get the country(ies) for each rideshare (sorted from Z-A).
      var getAllCountries = R.compose(
        R.reverse,
        R.sort(sortByCountryName),
        R.flatten,
        R.map(getItineraryCountries())
      );

      var allCountries = getAllCountries(rideshares);

      // Add up the countries into a sorted by count object
      var countryCount = R.countBy(R.split(R.uniq(allCountries)), allCountries);

      var chartData = buildGoogleChartData(R.keys(countryCount), countryCount);

      // return sorted Google Chart Data
      return R.reverse(R.sort(sortByCount, chartData));

    }

    return {
      googleChartData: googleChartData
    };

  }

})(angular.module('rideshares.services'));
