const coap = require('coap');

// Alamat IP dan port server CoAP
const serverAddress = 'coap://192.168.43.192/SensorData';
const serverPort = '5683';

// // Menerima pesan POST dari server
// const req = coap.request({
//   hostname: serverAddress,
//   port: serverPort,
//   pathname: '/SensorData', // Ganti dengan path yang sesuai dengan endpoint yang diharapkan
//   method: 'GET'
// });

// // Menangani respons dari server
// req.on('response', (res) => {
//   console.log('Pesan GET diterima:', res.payload.toString());
//   // Lakukan pengolahan data sesuai kebutuhan Anda
// });

// // Mengirimkan permintaan POST kosong ke server
// req.end();

// Mengirim permintaan CoAP ke server dan mengukur waktu respon
function measureLatency() {
  const startTime = new Date().getTime();

  // Membuat permintaan GET CoAP ke server
  const request = coap.request(serverAddress);
  request.on('response', function(response) {
    const endTime = new Date().getTime();
    const latency = endTime - startTime;
    console.log('Latency:', latency, 'ms');
  });

  request.end();
}

// Menjalankan fungsi untuk mengukur latency
measureLatency();


