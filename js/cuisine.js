var apiKey = require('./../.env').apiKey;
var apiKeyWeather = require('./../.env').apiKeyWeather;


export let Cuisine = {


  promiseOne: function(city) {
    return new Promise(function(resolve, reject) {
         let request = new XMLHttpRequest();
         let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`;
         request.onload = function() {
           if (this.status === 200) {
             let json = $.parseJSON(request.response);
             let lat = json.coord.lat;
             let long = json.coord.lon;
            //  console.log('successful first promise');
            //  console.log('this is our meat' + long);
             resolve(   { lat: lat, long: long} );
            //  console.log(response);
           } else {
             reject(Error(request.statusText));
           }
         };
         request.open("GET", url, true);
         request.send();
       }).then(this.promiseTwo);
       },
  promiseTwo: (coords, frontEndFunction) => {
    return new Promise( function(resolve, reject) {
        $.ajax({
          url: `https://developers.zomato.com/api/v2.1/geocode?lat=${coords.lat}&lon=${coords.long}`,
          type: 'POST',
          headers: {
            "user-key":`${apiKey}`
          },
          data: {
            format: 'json'
          },
          success: (response) => {
            resolve(response);
            alert('successful promise2');
            // console.log('success this ' + this);
            // console.log('this is the resposne of promise2  ' + response.location.title);
            // console.log('succesful promise two');

            // this.saveRestaurantsToArray(response, frontEndFunction);

          },
          error: function() {
            $('#output').text(`wrong coord`);
          }
        });
      }).then(this.saveRestaurantsToArray);
  },
  saveRestaurantsToArray: function(response, frontEndFunction){
    let restaurants = [];
    response.nearby_restaurants.forEach(function(restaurant){
        restaurants.push(
          {
            id: restaurant.restaurant.location.entity_id,
            name: restaurant.restaurant.name,
            cost: restaurant.restaurant.average_cost_for_two,
            cuisines: restaurant.restaurant.cuisines,
            userrating: restaurant.restaurant.user_rating.aggregate_rating,
            latitude: restaurant.restaurant.location.latitude,
            longitude: restaurant.restaurant.location.longitude,
            url: restaurant.restaurant.url,
            address: restaurant.restaurant.location.address
          });
        });
        frontEndFunction(restaurants);
    }
};
