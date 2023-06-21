const coap = require('coap');
const express = require('express');

const server = coap.createServer();
const host = '192.168.43.246';
const port = '5683';

const app = express();

app.use(express.json());

let sensorData = {};

server.on('request', function(req, res) {
  
  if (req.url === '/SensorData') {
    res.end('CoAP Request Received: ', req.url);
    // console.log(req.payload.toString())
    sensorData = JSON.parse(req.payload.toString());
  } else {
    res.statusCode = '4.04';
    res.end();
  }

  app.get('/Sensor', function (req, res) {
    res.json(sensorData);
  });

});

server.listen(function() {
  console.log('CoAP Server listening on port', server._sock.address().port);
});

app.listen(3000, function () {
  console.log('API server listening on port 3000');
});