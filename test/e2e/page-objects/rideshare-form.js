'use strict';

var RideshareForm = function () {

  this.sleep = function (ms) {
    if (!ms) {
      ms = 100;
    }
    browser.sleep(ms);
  };

  // Add Place Button
  this.addPlaceButton = element(by.id('add_place')); // jshint ignore:line
  this.clickAddPlace = function () {
    this.addPlaceButton.click();
  };

  // Place Form Input
  this.place = element(by.model('vm.place'));  // jshint ignore:line

  // Add a Google Place to an Itinerary Route
  this.addGooglePlace = function(place) {
    this.place.sendKeys(place);
    // wait for google place lookup
    this.sleep(500);
    // send the down arrow keystroke to the autocomplete
    this.place.sendKeys('\uE015');
    this.sleep(50);
    // send the tab keystroke to select from the autocomplete
    this.place.sendKeys('\uE004');
    this.sleep(50);
    // Click the add place button
    this.clickAddPlace();
    this.sleep(50);
  };

  // Save Rideshare
  this.saveRideshareButton = element(by.id('save_rideshare')); // jshint ignore:line

  this.clickSaveRideshare = function() {
    this.saveRideshareButton.click();
  };

  this.updateRideshareTitle = element(by.css('div > h1'));

  // Remove Rideshare
  this.removeRideshareButton = element(by.id('remove_rideshare')); // jshint ignore:line

  this.clickRemoveRideshare = function() {
    this.removeRideshareButton.click();
  };

};

module.exports = new RideshareForm();
