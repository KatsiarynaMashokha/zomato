var apiKey = require('./../.env').apiKey;

export let Cuisine = {



  apiRequest: function(lat, long, frontEndFunction){
    $.ajax({
      url: `https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}`,
      type: 'POST',
      headers: {
        "user-key":`${apiKey}`
      },
      data: {
        format: 'json'
      },
    success: (response) => {
      this.saveRestaurantsToArray(response, frontEndFunction);
    },
    error: function() {
    $('#output').text(`wrong coord`);
    }
  });
},


  saveRestaurantsToArray: function(response, frontEndFunction){
    let restaurants = [];
    response.nearby_restaurants.forEach(function(restaurant){
        restaurants.push(
          {
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
