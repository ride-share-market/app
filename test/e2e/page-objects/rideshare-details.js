'use strict';

var RideshareDetails = function () {

  this.cssAnimationDelay = function() {
    browser.sleep(210);
  };

  // Rideshare Show
  this.rideshareDetailsTitle = element(by.css('div > h1'));

  this.updateButton = element(by.id('update_rideshare'));

  this.clickUpdateButton = function() {
    this.updateButton.click();
    this.cssAnimationDelay();
  };

};

module.exports = new RideshareDetails();
