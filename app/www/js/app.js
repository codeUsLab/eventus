"use strict";

// angular.module is a global place for creating, registering and retrieving Angular modules
// "starter" is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of "requires"
// "starter.controllers" is found in controllers.js
angular.module("starter", [
  "ionic",
  "starter.cards",
  "starter.auth",
  "starter.controllers",
  "starter.filters",
  "starter.stack",
  "starter.services",
  "ionic.service.deploy",
  "ionic.contrib.ui.tinderCards",
  "ui.router",
  "ngAnimate"
  ])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// config function injects Providers
.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise("/signin");
  // $httpProvider.interceptors.push("AttachTokens");
  // to avoid CORS conflicts
  $httpProvider.defaults.useXDomain = true;
  // $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

  // ui-router lets us use states instead of routes. states allow us to create more complex views.
  $stateProvider
    .state("app", {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: "AppCtrl",
      data: {
        requireLogin: true // affects all children of app
      }
    })

    .state("signin", { // contains signin
      url: "/signin",
      templateUrl: "templates/signin.html",
      controller: "AuthCtrl",
      data: {
        requireLogin: false
      }
    })

    // .state("signup", {
    //   url: "/signup",
    //   templateUrl: "templates/signup.html",
    //   controller: "AuthCtrl",
    //   data: {
    //     requireLogin: false
    //   }
    // })

    .state("app.main", {
      url: "/main",
      views: {
       "menuContent": {
          templateUrl: "templates/main.html",
          controller: "CardsCtrl"
        }
      }
    })

    .state("app.filters", {
      url: "/filters",
      views: {
        "menuContent": {
          templateUrl: "templates/filters.html",
          controller: "FiltersCtrl"
        }
      }
    })

    // .state("app.accountSettings", {
    //   url: "/accountSettings",
    //   views: {
    //     "menuContent": {
    //       templateUrl: "templates/accountSettings.html"
    //     }
    //   }
    // })

    .state("app.stack", {
      url: "/stack",
      views: {
        "menuContent": {
          templateUrl: "templates/stack.html",
          controller: "StackCtrl"
        }
      }
    });
}])

.constant("SERVER", {
  // local server
  // url: "http://localhost:3000"

  // URL when deployed
  url: "http://45.55.142.5:80"
})

.factory("AttachTokens", function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem("com.starter");
      if (jwt) {
        object.headers["x-access-token"] = jwt;
      }
      object.headers["Allow-Control-Allow-Origin"] = "*";
      return object;
    }
  };
  return attach;
})

.run(["$rootScope", "$state", function ($rootScope, $state) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change states,
  // when it does change states, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn"t expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on("$stateChangeStart", function (event, toState) {
    var requireLogin = toState.data.requireLogin;
      if(requireLogin && !$rootScope.currentUser){
        // if(localStorage.getItem("com.starter")) {
        //   Auth.refreshUser(function () { // Inject Auth when this is used
        //     $state.go(toState);
        //   });
        // } else {
          event.preventDefault();
          console.log("User must be logged in to view this page");
          $state.go("signin");
        }
  });

}]);
