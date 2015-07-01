"use strict";
angular.module('starter')

  .factory("fetchEvents", ['$http', function($http){
    // post potential user to server which will determine if legit

    var llurlbase = 'http://maps.googleapis.com/maps/api/geocode/json?address=';
    var tzurlbase = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
    var eburlbase = 'https://www.eventbriteapi.com/v3/events/search/?';
    var ebtoken = '';
    var fetchedEvents = {};

    // should accept an object with following format:
    // parameters = {
    //   zip: 55555,
    //   miwithin: 5, // # of miles within ZIP code
    //   categories: '101,103,105', // comma-delimited IDs
    //   start_begin: 'yyyy-mm-ddThh:mm:00Z', // start_date.range_start; convert to UTC
    //   start_end: 'yyyy-mm-ddThh:mm:00Z' // start_date.range_end; convert to UTC
    // }

    fetchEvents.getLatLongFromZip = function(zip) {
      var url = gmurlbase + zip;
      var lat = '';
      var lng = '';
      return $http.get(url)
      .success(function (results, status) {
        if (status === 'OK') {
          lat = results[0].geometry.location.lat;
          lng = results[0].geometry.location.lng;
        }
      }).
      .error(function(results, status) {
        console.log('Lat/lng not fetched. Error: ', status);
      });
      return {lat: lat, lng: lng};
    };

    fetchEvents.getTimeZoneFromLatLng = function(latlng, unixtime) {
      var lat = latlng.lat;
      var lng = latlng.lng;
      var url = tzurlbase + lat + ',' + lng + '&timestamp=' + unixtime;
      var offsetHrs = 0;
      return $http.get(url)
      .success(function (results, status) {
        if (status === 'OK') {
          offsetHrs = (results.dstOffset + results.rawOffset) / 3600;
        }
      }).
      .error(function(results, status) {
        console.log('Time zone offset not fetched. Error: ', status);
      });
      return offsetHrs;
    };

    fetchEvents.getEvents = function (parameters) {
      var lat = getLatLongTimeZoneFromZip(parameters.zip).lat;
      var lng = getLatLongTimeZoneFromZip(parameters.zip).lng;
      var mi = parameters.miwithin;
      var cats = parameters.categories;
      var begin = parameters.start_begin;
      var end = parameters.start_end;
      var url = llurlbase + params;
      return $http.get(url)
      .success(function (results, status) {
        fetchedEvents = results;
      });
    };


    


    return fetchEvents;

  }]);



