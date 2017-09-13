var apiKey = require('./../.env').apiKey;

import{Cuisine} from './../js/cuisine.js';

$(function(){
$("#cuisine").submit(function(event){
  event.preventDefault();
  let lat = $("#lat").val();
  let long = $("#long").val();
  let restaurants = Cuisine.apiRequest(lat, long, display);

  console.log(restaurants + "rest");

  function display(apiArray) {
    apiArray.forEach(function(api) {
    $("#output").append("<li>"  + '<a href=' + api.url +'>' + api.name +  '</a>'+ '<p>' + api.address + '</p>');
      $("#output").append("<button class= " + 'btn-info'+ "onclick" + sayHi() + ">" + 'See on the maps' + "</button>");
      initMap(api.latitude, api.longitude);
  });


          function sayHi() {
            console.log('hi');
          }
  $("input").val("");

  }

  // function map(api){
  //   let apiArray = [];
  //   api.forEach(function(apiMap){
  //      let latitude = apiMap.latitude;
  //      let longitude = apiMap.longitude;
  //      apiArray.push(latitude, longitude);
  //       console.log(apiArray);
  //      return apiArray;
  //
  //
  //   });
  // }
  // let lati =45.5231 ;
  // let longi =-122.6765;
  function initMap(lati, longi) {
    console.log(lati);
    console.log(longi);
    var uluru = {lat: lati , lng: longi};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom:15,
      center: uluru
    });
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: uluru,
      map: map
    });
    marker.setCenter(map);

  }
  // initMap();

    // function initMap() {
    //   var uluru = {lat: -25.363, lng: 131.044};
    //    var map = new google.maps.Map(document.getElementById('map'), {
    //      zoom: 4,
    //      center: uluru
    //    });
    //    var marker = new google.maps.Marker({
    //      position: uluru,
    //      map: map
    //    });
    // }
  });
});
