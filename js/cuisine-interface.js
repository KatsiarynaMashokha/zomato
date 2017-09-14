var apiKey = require('./../.env').apiKey;

import {Cuisine} from './../js/cuisine.js';

$(function(){
$("#cuisine").submit(function(event){
  event.preventDefault();
  let lat = $("#lat").val();
  let long = $("#long").val();
  let city = $("#city").val();
  console.log(lat);
  console.log(long);
  // let restaurants = Cuisine.promiseTwo(lat, long, display);
  let cityLongLat = Cuisine.promiseOne(city);



  function display(apiArray) {
    apiArray.forEach(function(api) {

    $("#output").append("<li>" + api.name + '<p>' + api.address + '</p>' + '<div id = ' + api.id + '>' + 'Rating: ' + api.userrating  + '<br>' + 'Average cost for two($): ' + api.cost + '<br>' + 'Cuisines: ' + api.cuisines + '<br>' +
    '<a href=' + api.url +'>' + 'Restaurant link'  +  '</a>' + '</div>');
  });


  $("input").val("");

  // function initMap(restaurantLocation, arrayOfRestaurants) {
  //   let map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 15,
  //   center: restaurantLocation
  // });
  // arrayOfRestaurants.forEach(function(location){
  //   new google.maps.Marker({
  //     position: location,
  //     map: restaurantLocation,
  //     });
  //   });
  // }
  // initMap()
  }
});
});
