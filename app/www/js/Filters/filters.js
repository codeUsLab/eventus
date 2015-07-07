"use strict";

angular.module("starter.filters", [])

.controller("FiltersCtrl", function($scope, $rootScope, $location, StackFilters, FetchEvents) {

  $scope.categories = [[103,'Music'],[101,'Business'],[110,'Food & Drink'],[113,'Community'],[105,'Arts'],[104,'Film & Media'],[108,'Sports & Fitness'],[107,'Health'],[102,'Science & Tech'],[109,'Travel & Outdoor'],[111,'Charity & Causes'],[114,'Spirituality'],[115,'Family & Education'],[116,'Holiday'],[112,'Government'],[106,'Fashion'],[117,'Home & Lifestyle'],[118,'Auto, Boat & Air'],[119,'Hobbies'],[199,'Other']];
  $scope.filteredCategories = [];
  StackFilters.categoriesSelected = $scope.filteredCategories;

  $scope.addRemoveCategory = function(cat) {
    var index = -1;
    for (var i=0; i < $scope.filteredCategories.length; i++) {
      if ($scope.filteredCategories[i][0] === cat[0]) {
        index = i;
      }
    }
    if (index > -1) {
      console.log('before: ', $scope.filteredCategories);
      $scope.filteredCategories.splice(index, 1);
      console.log('after: ', $scope.filteredCategories);
    } else {
      var tuple = [];
      tuple[0] = cat[0];
      tuple[1] = cat[1];
      $scope.filteredCategories.push(tuple);
    }
    // $scope.changeFilter();
    StackFilters.categoriesSelected = $scope.filteredCategories;
  };

  $scope.isActive = function(id) {
    var index = -1;
    for (var i=0; i < $scope.filteredCategories.length; i++) {
      if ($scope.filteredCategories[i][0] === id) {
        index = i;
      }
    }
    return index > -1;
  };

  $scope.params = {};

  $scope.setParamsAndFetch = function(){
    var catsTemp = [];
    for (var i=0; i < $scope.filteredCategories.length; i++) {
      catsTemp = catsTemp.concat($scope.filteredCategories[i][0]);
    }
    $scope.params.categories = catsTemp.join(',');
    $rootScope.$emit('updatedFilters', $scope.params);
    $location.path("/app/main");
  };

});
