"use strict";
angular.module("starter.services", [])

  .factory("Auth", function($http, SERVER){
    var signin = function() {
      var config = {
        'client_id': '989969156266-814fcdt9cht50r842r0serpo6b6ol6nm',
        'scope': 'https://www.googleapis.com/auth/calendar',
        'immediate': false
      };
      return gapi.auth.authorize(config);
    };

    var signout = function() {
      return  gapi.auth.signOut();
    };

    var checkAuth = function() {
      var config = {
        'client_id': '989969156266-814fcdt9cht50r842r0serpo6b6ol6nm',
        'scope': 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/plus.login',
        'immediate': true
      };
      return gapi.auth.authorize(config);
    };

    var getUser = function() {
      return $http(https://www.googleapis.com/plus/v1/people/me?key={YOUR_API_KEY})
    }

    return {
      signin: signin,
      checkAuth: checkAuth,
      signout: signout
      // refreshUser: refreshUser
    };
  })
  
  .factory('Location', function() {
    return {
      currentLocation: function(cb) {
        return navigator.geolocation.getCurrentPosition(cb);
      }
    };
  })

  .factory('Gcal', function(Auth) {
    var EtoG = function(ebObject) {

      var address = ebObject.venue.address;
      var fullAddress = address.address_1+" "+address.city+" "+address.region+" "+address.postal_code+" "+address.country;

      var Gevent = {
        calendarId: 'primary',
        summary: ebObject.name.text,
        source: {
          title: ebObject.name.text,
          url: ebObject.url
        },
        start: {dateTime: ebObject.start.utc},
        end: {dateTime: ebObject.end.utc},
        location: fullAddress,
        description: ebObject.description.text,
        htmlLink: ebObject.url
      }
      return Gevent;
    }
    var sendToGcal = function(event) {
      gapi.client.load('calendar', 'v3')
      .then(function() {
        gapi.client.calendar.events.insert(event)
        .execute(function(response) {
          console.log(response);
          console.log('Event created: '+event.htmlLink);
        })
      })

    };
    return {
      EtoG: EtoG,
      sendToGcal: sendToGcal,
      event: event
    };

  })

  .factory("EventChoices", function(){
    var myStack = [];

    var addToStack = function (event) {
      myStack.push(event);
      console.log('added to stack', event);
    };

    var getStack = function () {
      return myStack;
    };

    // delete a book from a user's stack of saved books
    var removeFromStack = function (index) {
      myStack.splice(index, 1);
    };
    
    return {
      addToStack: addToStack,
      getStack: getStack,
      removeFromStack: removeFromStack
    };
  })

