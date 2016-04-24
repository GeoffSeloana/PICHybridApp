// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
starter = angular.module('starter', ['ionic', 'ionic.contrib.ui.cards', 'ionic-material','ionic-toast'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('login', {
      url: "/",
      templateUrl: "templates/login.html",
      controller: 'loginCtrl'
    })
    .state('register', {
      url: "/reg",
      templateUrl: "templates/register.html",
      controller: 'registerCtrl'
    })
    .state('main', {
      url: "/main",
      templateUrl: "templates/main.html",
      controller: 'CardsCtrl'
    })
    .state('services', {
      url: "/service",
      templateUrl: "templates/services.html",
      controller: 'serviceCtrl'
    })
    .state('serviceDetails', {
      url: "/details",
      templateUrl: "templates/serviceDetails.html"
    })

  // if none of the above states are matched, use this as the fallback
  if (localStorage.getItem("USER") === null) { $urlRouterProvider.otherwise('/');}else{ $urlRouterProvider.otherwise('/main');};


})

/*
.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
*/



;
