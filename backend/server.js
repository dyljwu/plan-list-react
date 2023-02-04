require('dotenv').config();
const express = require('express');
require('nodemon');
const cors = require('cors');
const axios = require('axios')

const ws = require('express-ws');

const clients = [];

const PLANS_API_URL = 'https://fibermap.dev.vetro.io/v2/plans';
const { TOKEN, COOKIE } = process.env;

const app = express();

app.use(cors())

app.use(express.json());

ws(app);

app.ws('/socket', (ws, req) => {

  clients.push([ws, req]);
  // console.log(req.socket.remotePort)
  // if (!clients.contains(req.socket.remotePort)) {
  //   clients.push(req.socket.remotePort);
  // }
  
  ws.on('message', (msg) => {
    console.log(JSON.stringify(msg))
    setTimeout(() => {
      clients.forEach(([socket, request]) => {
        socket.send(`Client at remote port ${request.socket.remotePort} just said: "${msg}"`) 
      })
    }, 1000);
  });
});

var plansGetConfig = {
  method: 'get',
  url: PLANS_API_URL,
  headers: { 
    'token': TOKEN, 
    'Cookie': COOKIE
  }
};

app.get('/plans', async (req, res) => {
  const response = await axios(plansGetConfig);
  const { data } = response;
  res.send(data);
});

const port =  3050;

app.listen(port, () => {

    console.log(`Server listening on port ${port}`);
}
);


