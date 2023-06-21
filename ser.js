const coap = require('coap');
const server = coap.createServer();

const clients = [];

// Menangani permintaan POST dari NodeMCU
server.on('request', (req, res) => {
  if (req.method === 'POST') {
    const payload = req.payload.toString();
    console.log('Data dari NodeMCU:', payload);

    // Teruskan data ke klien yang terhubung
    clients.forEach((client) => {
      if (client !== req.rsinfo) {
        const forwardReq = coap.request({
          hostname: client.address,
          port: client.port,
          method: 'POST'
        });
        forwardReq.write(payload);
        forwardReq.end();
      }
    });

    res.end('OK');
  } else {
    res.code = '4.04';
    res.end();
  }
});

// Menambahkan klien yang terhubung ke daftar klien
server.on('listening', () => {
  console.log('Server CoAP berjalan');
});

server.on('request', (req) => {
  if (!clients.find((client) => client.address === req.rsinfo.address && client.port === req.rsinfo.port)) {
    clients.push(req.rsinfo);
    console.log('Klien terhubung:', req.rsinfo);
  }
});

server.on('clientError', (err) => {
  console.error('Terjadi kesalahan klien:', err);
});

// Jalankan server CoAP
server.listen(() => {
  console.log('Server CoAP berjalan');
});
