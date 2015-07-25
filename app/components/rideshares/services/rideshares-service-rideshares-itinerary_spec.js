(function () {
  'use strict';

  describe('Rideshares Service', function () {

    describe('Rideshares Itinerary', function () {

      beforeEach(module('rideshares.services'));

      var RidesharesItinerarySvc;

      beforeEach(function () {
        inject(function (_RidesharesItinerarySvc_) {
          RidesharesItinerarySvc = _RidesharesItinerarySvc_;
        });
      });

      describe('New Itinerary', function() {

        var newItinerary = {
            route: []
        };

        it('should add default properties', function () {

          var itinerary = RidesharesItinerarySvc.itinerary(newItinerary);

          itinerary.type.should.equal('Wanted');
          itinerary.trip.should.equal('One-way');
          itinerary.frequency.should.equal('One time');
          itinerary.vehicle.should.equal('Car');
          itinerary.seats.should.equal(1);
          itinerary.luggage.should.equal('Small Amount');
          itinerary.shareDriving.should.equal('No');
          itinerary.smoking.should.equal('No');
          itinerary.currency.should.equal('$');
          itinerary.cost.should.equal(0);
          itinerary.comment.should.equal('');

        });

      });

      describe('Existing Itinerary', function() {

        var existingItinerary = {
            route: [],
            type: 'Offering',
            trip: 'Round trip',
            frequency: 'Daily',
            vehicle: 'Taxi',
            seats: 2,
            luggage: 'Backpack',
            shareDriving: 'Yes',
            smoking: 'Yes',
            currency: '€',
            cost: 10,
            comment: 'Rideshare available'
        };

        it('should use existing properties', function () {

          var itinerary = RidesharesItinerarySvc.itinerary(existingItinerary);

          itinerary.type.should.equal(existingItinerary.type);
          itinerary.trip.should.equal(existingItinerary.trip);
          itinerary.frequency.should.equal(existingItinerary.frequency);
          itinerary.vehicle.should.equal(existingItinerary.vehicle);
          itinerary.seats.should.equal(existingItinerary.seats);
          itinerary.luggage.should.equal(existingItinerary.luggage);
          itinerary.shareDriving.should.equal(existingItinerary.shareDriving);
          itinerary.smoking.should.equal(existingItinerary.smoking);
          itinerary.currency.should.equal(existingItinerary.currency);
          itinerary.cost.should.equal(existingItinerary.cost);
          itinerary.comment.should.equal(existingItinerary.comment);

        });

      });

      describe('Itinerary Options', function() {

        it('should return an intineray options object', function() {

          var io = RidesharesItinerarySvc.itineraryOptions;

          should.exist(io.types);
          should.exist(io.trips);
          should.exist(io.frequencies);
          should.exist(io.vehicleTypes);
          should.exist(io.seats);
          should.exist(io.luggage);
          should.exist(io.shareDriving);
          should.exist(io.smoking);
          should.exist(io.currencies);

        });

      });

    });

  });

})();
