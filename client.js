const coap = require('coap');

function sendRes(){
const req = coap.request('coap://192.168.43.192/Sensor');

// req.on('response', (res) => {
//   console.log('Response Code:', res.code);
//   console.log(res.payload.toString());

// });

req.setOption('Observe', 0);

req.on('response', (res) => {
  res.on('data', (data) => {
    const coapdata = data.toString();
    console.log(coapdata);
  })
})
req.end();
}

sendRes();