"use strict";
angular.module("starter.auth", [])

.controller("AuthCtrl", function (FetchEvents, $timeout, $scope, $rootScope, $location, $window, Auth, Location){
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin()
      .then(function (authResult) {
        $rootScope.currentUser = authResult;
        FetchEvents.zip = $scope.user.zip;
        $rootScope.onsignin = true;
        $timeout(function () {
          $location.path("/app/main");         
        }, 0);
      })
      // .catch(function (error) {
      //   console.log(error);
      // });
  };

  $scope.getLocation = function() {

    Location.currentLocation(function(position) {
      console.log(position);
      // $scope.user.location = position
    });
  }();

  // signout by removing token from localStorage and removing current user in $rootScope
  $scope.signout = function () {
    delete $rootScope.currentUser;
    Auth.signout();
    $location.path("/signin");
  };

  // $scope.isAuth = function(){
  //   return !!$window.localStorage.getItem("com.starter");
  // };

});
