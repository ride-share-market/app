'use strict';

var NavTop = function () {

  this.cssAnimationDelay = function() {
    browser.sleep(210);
  };

  // Home Page
  this.homeLink = element(by.xpath("//rsm-nav-top//a[@href='#!/']")); // jshint ignore:line
  this.homePageTitle = element(by.css('div > h1'));
  this.clickHome = function () {
    this.homeLink.click();
    this.cssAnimationDelay();
  };

  // About Us
  this.aboutUsLink = element(by.xpath("//rsm-nav-top//a[@href='#!/about']")); // jshint ignore:line
  this.aboutUsTitle = element(by.css('div > h1'));
  this.clickAboutUs = function () {
    this.aboutUsLink.click();
    this.cssAnimationDelay();
  };

  // Privacy Policy
  this.privacyPolicyLink = element(by.xpath("//rsm-nav-top//a[@href='#!/privacy']")); // jshint ignore:line
  this.privacyPolicyTitle = element(by.css('div > h1'));
  this.clickPrivacyPolicy = function () {
    this.privacyPolicyLink.click();
    this.cssAnimationDelay();
  };

  // Terms and Conditions
  this.termsLink = element(by.xpath("//rsm-nav-top//a[@href='#!/terms']")); // jshint ignore:line
  this.termsTitle = element(by.css('div > h1'));
  this.clickTerms = function () {
    this.termsLink.click();
    this.cssAnimationDelay();
  };

  // Contact Us
  this.contactLink = element(by.xpath("//rsm-nav-top//a[@href='#!/contact']")); // jshint ignore:line
  this.contactTitle = element(by.css('div > h1'));
  this.clickContact = function () {
    this.contactLink.click();
    this.cssAnimationDelay();
  };

  // Create Rideshare
  this.createRideshareLink = element(by.xpath("//rsm-nav-top//a[@href='#!/rideshares/create']")); // jshint ignore:line
  this.createRideshareTitle = element(by.css('div > h1'));
  this.clickCreateRideshare = function () {
    this.createRideshareLink.click();
    this.cssAnimationDelay();
  };

};

module.exports = new NavTop();
