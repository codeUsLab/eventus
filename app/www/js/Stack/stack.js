"use strict";

angular.module("starter.stack", [])

.controller("StackCtrl", function($scope, EventChoices, $rootScope, Auth, Gcal) {

    $scope.addToGcal = function(ebObject) {
      Auth.checkAuth()
      .then(function(){
        var gCalObject = Gcal.EtoG(ebObject);
        console.log(gCalObject);
        Gcal.sendToGcal(gCalObject);
      });
    };

  $scope.userId = $rootScope.currentUser.id;
  $scope.stack = [];
  // get list of saved books aka 'stack' using getStack method from BookChoices factory
  $scope.getStack = function() {
    $scope.stack = EventChoices.getStack();
  };

  // $scope.getStack = function( id ) {
  //   BookChoices.getStack(id)
  //     .then(function(data){
  //       $scope.stack = data.stack;
  //     });
  // };

  // remove book at index from stack
  $scope.removeFromStack = function( index ){
    EventChoices.removeFromStack(index);
    $scope.getStack();
  };

  $scope.getStack();
});
