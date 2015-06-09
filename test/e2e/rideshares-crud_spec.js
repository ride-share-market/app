'use strict';

var fs = require('fs');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('../../config/app'),
  RsmPage = require('./page-objects/rsm-page'),
  navTop = require('./page-objects/nav-top'),
  rideshareForm = require('./page-objects/rideshare-form'),
  rideshareDetails = require('./page-objects/rideshare-details'),
  baseURL = config.get('e2e').url[env],
  rsmPage = new RsmPage(baseURL),
  jwtFixture = fs.readFileSync(config.get('root') + '/test/fixtures/e2e-jwt.txt').toString();

describe('Rideshares', function () {

  describe('CRUD', function () {

    it('should create a new rideshare', function () {
      rsmPage.get('/#!/welcome?jwt=' + jwtFixture);
      // Initial SPA load, wait 1/2 second for the menu to render (it's checking localstorage)
      rsmPage.sleep(2000);
      navTop.clickCreateRideshare();
      expect(navTop.createRideshareTitle.getText()).toEqual('New Rideshare');
      rideshareForm.addGooglePlace('palo alto ca united states');
      rideshareForm.addGooglePlace('mountain view ca united states');
      rideshareForm.clickSaveRideshare();
      rsmPage.sleep(2000);
      expect(rideshareDetails.rideshareDetailsTitle.getText()).toEqual('Rideshare Details');
    });

    it('should update a rideshare', function () {
      navTop.clickHome();
      rsmPage.clickLinkText('Palo Alto');
      rsmPage.sleep(210);
      expect(rideshareDetails.rideshareDetailsTitle.getText()).toEqual('Rideshare Details');
      rideshareDetails.clickUpdateButton();
      expect(rideshareForm.updateRideshareTitle.getText()).toEqual('Update Rideshare');
    });

    it('should remove a rideshare', function () {
      navTop.clickHome();
      rsmPage.clickLinkText('Palo Alto');
      rsmPage.sleep(210);
      expect(rideshareDetails.rideshareDetailsTitle.getText()).toEqual('Rideshare Details');
      rideshareDetails.clickUpdateButton();
      expect(rideshareForm.updateRideshareTitle.getText()).toEqual('Update Rideshare');
      rideshareForm.clickRemoveRideshare();
      rsmPage.sleep(210);
      rsmPage.clickLinkText('Yes, please remove.');
      rsmPage.sleep(2000);
      browser.waitForAngular();
    });

  });

});
