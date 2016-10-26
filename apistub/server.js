const express = require('express');
const app = express();
const router = express.Router(); // eslint-disable-line new-cap
const fs = require('fs');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
  res.header('Content-Type', 'application/json');
  next();
});

fs.readFile(`${__dirname}/responseMaps.json`, 'utf8', (err, data) => {
  const responseMaps = JSON.parse(data);
  responseMaps.forEach((responseMap) => {
    const route = router.route(responseMap.endpoint);
    responseMap.methods.forEach((method) =>
      route[method]((req, res) =>
        fs.readFile(`${__dirname}/currentResponse.json`, 'utf8', (err2, current) => {
          const currentResponse = JSON.parse(current);
          if (currentResponse[responseMap.endpoint]) {
            if (typeof currentResponse[responseMap.endpoint][method] !== 'undefined') {
              const response = responseMap[method][currentResponse[responseMap.endpoint][method]];
              if (response.body) {
                res.status(response.status);
                fs.readFile(`${__dirname}${response.body}`, 'utf8', (err3, body) => {
                  res.end(body);
                });
              } else {
                res.status(response.status).send();
              }
            } else {
              console.error(
                `${method} not defined under ${responseMap.endpoint} in currentResponse.json`);
            }
          } else {
            console.error(`${responseMap.endpoint} entry missing in currentResponse.json`);
          }
        })
    ));
  });
});

app.use(router);

const server = app.listen(2001, () => {
  const port = server.address().port;
  console.log('Sample API listening on port %s', port);
});
