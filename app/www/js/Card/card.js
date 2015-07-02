"use strict";

angular.module("starter.cards", [])

.controller("CardsCtrl", function($scope, FetchEvents, filterChoices, BookChoices, $ionicSideMenuDelegate, $rootScope){

  var params = {zip: 94114, miwithin: 5, categories: '101,103'};
  FetchEvents.getEvents(params, 0)
  .then(function(results) {
    console.log(FetchEvents.events);
  });


  //prevent side menu from dragging out with cards
  $ionicSideMenuDelegate.canDragContent(false);
  //repulls books every time the filters change
  $scope.$watch(function(){
    return filterChoices.genresSelected.length;
  }, function(){
    console.log("change in filter was noticed");
    $scope.getBooks($scope.userId, 10);
  });

  // retrieves books from the database
  $scope.getBooks = function(userId, count){
    BookChoices.getBooks(userId, count)
      .then(function(books){
        $scope.cards = books;
        $scope.currentCard = $scope.cards[$scope.cards.length - 1];
      });
  };

  $scope.userId = $rootScope.currentUser.id;

  // Handles book swiping
  $scope.cardSwipedLeft = function(index) {
    $scope.clicked = false;
   console.log("Left swipe", index);
 };

 // Adds card to stack when user swipes right
  $scope.cardSwipedRight = function(index) {
    $scope.clicked = false;
    console.log("Right swipe", index);
    BookChoices.addToStack($scope.userId, $scope.cards[index]);
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    $scope.currentCard = $scope.cards[index - 1];
    console.log("Card removed");
    if(index === 0){
      $scope.getBooks($scope.userId, 10);
    }
  };

  $scope.cardPartialSwipe = function(amt){
    console.log(amt);
  };

  $scope.showText = function() {
    $scope.clicked = $scope.clicked ? false : true;
 };

 $scope.clicked = false;


// functions for liking or disliking book via buttons
// must use currentCard because buttons are out of card scope
  $scope.like = function( card ){
    var index = $scope.cards.indexOf(card);
    $scope.cardSwipedRight(index);
    $scope.cardDestroyed(index);
  };

  $scope.dislike = function( card ){
    var index = $scope.cards.indexOf(card);
    $scope.cardSwipedLeft(index);
    $scope.cardDestroyed(index);
  };
  console.log($scope);
});
