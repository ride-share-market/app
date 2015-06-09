'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('../../config/app'),
  RsmPage = require('./page-objects/rsm-page'),
  navTop = require('./page-objects/nav-top'),
  baseURL = config.get('e2e').url[env],
  rsmPage = new RsmPage(baseURL);

describe('Ride Share Market', function () {

  describe('Basic', function () {

    it('should load the home page', function () {

      rsmPage.get('/');

      // Initial SPA load, wait 1/2 second for the menu to render (it's checking localstorage)
      rsmPage.sleep(1000);

      expect(browser.getTitle()).toEqual('Ride Share Market');

    });

    it('should load the about us page', function () {
      navTop.clickAboutUs();
      expect(navTop.aboutUsTitle.getText()).toEqual('About Us');
    });

    it('should load the privacy policy page', function () {
      navTop.clickPrivacyPolicy();
      expect(navTop.privacyPolicyTitle.getText()).toEqual('Privacy Policy');
    });

    it('should load the terms and conditions page', function () {
      navTop.clickTerms();
      expect(navTop.termsTitle.getText()).toEqual('Ride Share Market Terms and Conditions ("Agreement")');
    });

    it('should load the contact us page', function () {
      navTop.clickContact();
      expect(navTop.contactTitle.getText()).toEqual('Contact Us');
    });

    it('should link to and load the home page', function () {
      navTop.clickHome();
      expect(navTop.homePageTitle.getText()).toMatch(/Ride Share Market/);
    });

  });

});
