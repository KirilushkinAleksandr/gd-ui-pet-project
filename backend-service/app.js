const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const url = 'http://localhost:3001/';

app.use(bodyParser.json());

app.get('/:id', (req, res) => {
  const id = req.params['id'];
  axios.get(`http://localhost:3001/${id}`).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(400).send(`${error}`)
  });
});

app.post('/', function (req, res) {
  const car = req.body;
  if (!car) {
    res.status(400).send('Body of request is empty, please add more fields');
  }
  axios.post(`http://localhost:3001/`, car).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(400).send(`${error}`)
  });
});

app.put('/:id', function (req, res) {
  const id = req.params['id'];
  const car = req.body;
  if (!car) {
    res.status(400).send('Body of request is empty, please add more fields');
  }
  axios.put(`http://localhost:3001/${id}`, car).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(400).send(`${error}`)
  });
});

app.delete('/:id', function (req, res) {
  const id = req.params['id'];
  axios.delete(`http://localhost:3001/${id}`).then(response => {
    res.status(200).send(response.data);
  }).catch(error => {
    res.status(400).send(`${error}`)
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});