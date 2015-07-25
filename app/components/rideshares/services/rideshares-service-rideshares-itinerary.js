(function (module) {
  'use strict';

  module.factory('RidesharesItinerarySvc', RidesharesItinerarySvc);

  function RidesharesItinerarySvc() {

    var itineraryOptions = {
      types: ['Wanted', 'Offering'],
      trips: ['One-way', 'Round trip'],
      frequencies: [
        'One time',
        'Daily',
        'Weekly',
        'Occasional',
        'Regular',
        'Often'
      ],
      vehicleTypes: [
        'Car',
        'Taxi',
        'Van',
        'Truck',
        'Motorcycle'
      ],
      seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      luggage: [
        'None',
        'Small Amount',
        'Backpack',
        'Suitcase',
        'Sports Equipment',
        'Larger'
      ],
      shareDriving: ['Yes', 'No'],
      smoking: ['Yes', 'No'],
      currencies: ['$', '€', '£', '¥', '₱', '฿', 'Rp', '₩', 'RM', '₹', '₨']

    };

    function setup(itineraryOptions, itinerary) {

      itinerary.type = itinerary.type || itineraryOptions.types[0]; // wanted
      itinerary.trip = itinerary.trip || itineraryOptions.trips[0]; // One-way
      itinerary.frequency = itinerary.frequency || itineraryOptions.frequencies[0]; // One Time
      itinerary.vehicle = itinerary.vehicle || itineraryOptions.vehicleTypes[0]; // Car
      itinerary.seats = itinerary.seats || itineraryOptions.seats[0]; // 1
      itinerary.luggage = itinerary.luggage || itineraryOptions.luggage[1]; // Small Amount
      itinerary.shareDriving = itinerary.shareDriving || itineraryOptions.shareDriving[1]; // No
      itinerary.smoking = itinerary.smoking || itineraryOptions.smoking[1]; // No
      itinerary.currency = itinerary.currency || itineraryOptions.currencies[0]; // $
      itinerary.cost = itinerary.cost || 0; // Zero cost
      itinerary.comment = itinerary.comment || ''; // No comment

      return itinerary;

    }

    return {
      itinerary: function (itinerary) {
        return setup(itineraryOptions, itinerary);
      },
      itineraryOptions: itineraryOptions
    };

  }

})(angular.module('rideshares.services'));
