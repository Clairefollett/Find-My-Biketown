var express = require('express'),
  requestProxy = require('express-request-proxy'),
  // httpRedirect = require('./redirect-http')(),
  port = process.env.PORT || 3000,
  app = express(),
  superagent = require('superagent');

app.use(express.static('./'));
app.get('/googleMaps', proxyGoogle);

function proxyGoogle(request, response) {
  (requestProxy({
    url: 'https://maps.googleapis.com/maps/api/js',
    query: {
      key: process.env.API_KEY,
      libraries: 'places',
      callback: 'initMap'
    }
  }
))(request, response);
};

app.get('/bikedata', function(request, response){
  superagent.get('http://biketownpdx.socialbicycles.com/opendata/station_information.json')
    .end(function(error, res){
      response.json(res.body);
    });
  // (requestProxy({
  //   url: 'https://biketownpdx.socialbicycles.com/opendata/station_information.json',
  //   query: {}
  // }))(request, response);
});

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

// if(process.env.NODE_ENV === 'production') {
//   app.use(redirectHttp);
// }

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
