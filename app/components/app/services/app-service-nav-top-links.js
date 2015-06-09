(function (module) {
  'use strict';

  module.factory('NavTopLinksSvc', function () {
      return {
       urls: [
         {
           text: 'Home',
           url: '#!/'
         },
         {
           text: 'Create',
           url: '#!/rideshares/create'
         },
         {
           text: 'About Us',
           url: '#!/about'
         },
         {
           text: 'Privacy Policy',
           url: '#!/privacy'
         },
         {
           text: 'Terms',
           url: '#!/terms'
         },
         {
           text: 'Contact Us',
           url: '#!/contact'
         }
       ]
      };
    });

})(angular.module('app.services'));
