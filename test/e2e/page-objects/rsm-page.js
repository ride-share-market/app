'use strict';

module.exports = function RsmPage(baseURL) {

  var width = 1024;
  var height = 768;
  browser.driver.manage().window().setSize(width, height);

  this.baseURL = baseURL;

  this.get = function (path) {
    browser.get(this.baseURL + path);
  };

  this.sleep = function (ms) {
    if (!ms) {
      ms = 100;
    }
    browser.sleep(ms);
  };

  this.pause = function() {
    browser.pause();
  };

  this.clickLinkText = function(text) {
    var xPath = '//*[contains(text(),\'' + text + '\')]';
    var link = element(by.xpath(xPath));
    link.click();
  };

};
