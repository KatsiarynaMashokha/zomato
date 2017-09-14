var apiKey = require('./../.env').apiKey;

import {Cuisine} from './../js/cuisine.js';

$(function(){
$("#cuisine").submit(function(event){
  event.preventDefault();
  let lat = $("#lat").val();
  let long = $("#long").val();
  // let city = $("#city").val();
  Cuisine.apiRequest(lat, long, display);
  // let restaurants = Cuisine.promiseTwo(lat, long, display);
  // let cityLongLat = Cuisine.coordinateFinder(city);



  function display(apiArray) {
    apiArray.forEach(function(api) {

    $("#output").append("<li>" + api.name + '<p>' + api.address + '</p>' + '<div id = ' + api.id + '>' + 'Rating: ' + api.userrating  + '<br>' + 'Average cost for two($): ' + api.cost + '<br>' + 'Cuisines: ' + api.cuisines + '<br>' +
    '<a href=' + api.url +'>' + 'Restaurant link'  +  '</a>' + '</div>');
  });


  $("input").val("");

  }
});
});
