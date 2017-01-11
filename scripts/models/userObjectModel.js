(function(module) {
  var user = {};

  user.userObject = {};

  $.fn.serializeJSON=function() {
    var json = {};
    jQuery.map($(this).serializeArray(), function(n, i){
      json[n['name']] = n['value'];
    });
    return json;
  };

  $('form').on('submit', function(event) {
    event.preventDefault();
    user.userObject = $('form').serializeJSON(); // create a user object from the form submission
    // !!!!!!!!! these lat/lon are TEST numbers (Pioneer Sq)
    user.userObject.lat = 45.519164;
    user.userObject.lon = -122.679375;
    // ^^^^^^^^^^^ CALCULATE actual lat/lon above

    // make API call to Biketown stations and calculate closest bike stations to user
    output.requestBikeStations(output.calcDistanceFromUserAndSort);

    return(user.userObject);
  });

  module.user = user;
})(window);
