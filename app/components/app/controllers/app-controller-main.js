(function (module) {
  'use strict';

  function MainCtrl($mdMedia, rsmConfig) {

    this.version = rsmConfig.version;

    var pix;
    ($mdMedia('gt-md')) ? pix = 12 : pix = 18;
    console.log('pix', pix);

    console.log('mdMedia', $mdMedia('sm'));
    console.log('mdMedia', $mdMedia('gt-md'));
    console.log('mdMedia', $mdMedia('max-width: 300px'));

  }

  module.controller('MainCtrl', MainCtrl);

})(angular.module('app'));
