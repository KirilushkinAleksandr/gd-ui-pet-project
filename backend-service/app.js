const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const url = 'http://localhost:3001';

app.use(bodyParser.json());

app.get('/:api', (req, res) => {
  const api = `${req.params['api']}`;
  axios.get(`${url}/${api}`).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(500).send(`${error}`)
  });
});

app.get('/:api/:id', (req, res) => {
  const api = `${req.params['api']}/${req.params['id']}`;
  axios.get(`${url}/${api}`).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(500).send(`${error}`)
  });
});

app.post('/:api', function (req, res) {
  const api = `${req.params['api']}`;
  const obj = req.body;
  if (!obj) {
    res.status(400).send('Body of request is empty, please add more fields');
  }
  axios.post(`${url}/${api}`, obj).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(500).send(`${error}`)
  });
});

app.put('/:api/:id', function (req, res) {
  const api = `${req.params['api']}/${req.params['id']}`;
  const obj = req.body;
  if (!obj) {
    res.status(400).send('Body of request is empty, please add more fields');
  }
  axios.put(`${url}/${api}`, obj).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(500).send(`${error}`)
  });
});

app.delete('/:api/:id', function (req, res) {
  const api = `${req.params['api']}/${req.params['id']}`;
  axios.delete(`${url}/${api}`).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(500).send(`${error}`)
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});