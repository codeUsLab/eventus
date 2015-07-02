"use strict";
angular.module('starter')

  .factory("FetchEvents", ['$http', function($http){
    // post potential user to server which will determine if legit

    var llurlbase = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
    var eburlbase = 'https://www.eventbriteapi.com/v3/events/search/?';
    var ebtken = 'MKFL4P7OGOVRM3P7IV6L';
    var FetchEvents = {};

    FetchEvents.getLatLongFromZip = function(zip) {
      var url = llurlbase + zip;
      return $http.get(url);
      // .success(function (results, status) {
      //   return results;
      // })
      // .error(function (results, status) {
      //   console.log('Lat/lng not fetched. Error: ', status);
      // });
    };

  // should accept an object with following format:
    // parameters = {
    //   zip: 55555,
    //   miwithin: 5, // # of miles within ZIP code
    //   categories: '101,103,105', // comma-delimited IDs
    // }

    // FetchEvents.getEvents = function (parameters) {
    //   var mi = parameters.miwithin;
    //   var cats = parameters.categories;
    //   var eventArr = [];

    //   FetchEvents.getLatLongFromZip(parameters.zip)
    //     .then(function (results) {
    //       var lat = results.data.results[0].geometry.location.lat;
    //       var lng = results.data.results[0].geometry.location.lng;
    //       var urlstem = eburlbase + 'location.within=' + mi + 'mi&location.latitude=' + lat + '&location.longitude=' + lng + '&start_date.keyword=this_month&popular=on&categories=' + cats + '&token=' + ebtken + '&expand=venue';

    //       var retrieveEvents = function(url) {
    //         $http.get(url)
    //         .then(function (results) {
    //           eventArr = eventArr.concat(results.data.events);
    //           if (results.data.pagination.page_number <= results.data.pagination.page_count) {
    //             var newUrl = urlstem + '&page=' + (+results.data.pagination.page_number + 1);
    //             retrieveEvents(newUrl);
    //           } else {
    //             console.log(eventArr);
    //             return eventArr;
    //           }
    //         })
    //       };

    //     retrieveEvents(urlstem);
    //   });  
    //     return eventArr;
    // };

    FetchEvents.getEvents = function(parameters, page) {
      return FetchEvents.getLatLongFromZip(parameters.zip)
      .then(function(results) {
        var mi = parameters.miwithin;
        var cats = parameters.categories;
        var eventArr = [];

        var lat = results.data.results[0].geometry.location.lat;
        var lng = results.data.results[0].geometry.location.lng;
        var url = eburlbase + 'location.within=' + mi + 'mi&location.latitude=' + lat + 
        '&location.longitude=' + lng + '&start_date.keyword=this_month&popular=on&categories=' + 
        cats + '&token=' + ebtken + '&expand=venue' + '&page=' + page;
        return $http.get(url)
          .then(function(results) {
            FetchEvents.events = results.data.events;
          })
      });
    };    
    return FetchEvents;

  }]);



