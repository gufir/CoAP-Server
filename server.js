const coap = require('coap');

const server = coap.createServer();
let data ={};

server.on('request', (req, res) => {
  if (req.url === '/SensorData') {
    const payload = req.payload.toString();
      data = JSON.parse(payload);
      const paket = JSON.stringify(data);
      console.log('Received data from NodeMCU:');

      console.log(paket);
      res.end('Success');
  }

  if (req.url === '/Sensor'){
    const payload = JSON.stringify(data);
    res.end(payload);
  }
  else {
    res.statusCode = '4.04';
    res.end();
  }
});


server.listen( () => {
  console.log('CoAP Server listening on port', server._sock.address().port);
});



