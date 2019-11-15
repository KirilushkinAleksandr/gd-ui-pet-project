const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const endpoint = '';
const crypto = require("crypto");

let dataBase = require('./db/users.json').dataBase;

app.use(bodyParser.json());

app.get(`${endpoint}/:id`, (req, res) => {
  const id = req.params['id'];
  let result;
  if (id) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        result = dataBase[i];
      }
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('User with this id not found');
    }
  } else {
    res.status(400).send('Please, provide id');
  }
});

app.get(`${endpoint}`, (req, res) => {
  try {
    res.status(200).send(dataBase);
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.json(JSON.stringify(err));
  }
});

app.post(`${endpoint}`, function (req, res) {
  const user = req.body;
  const id = crypto.randomBytes(2).toString("hex");
  const newUser = {
    id: id,
    name: user.name || "Name",
    surname: user.surname || "Surname"
  };
  dataBase.push(newUser);
  res.status(200).send(newUser);
});

app.put(`${endpoint}/:id`, function (req, res) {
  const id = req.params['id'];
  let result;
  const newUser = req.body;
  if (id) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        for (const prop in newUser) {
          if (dataBase[i].hasOwnProperty(prop)) {
            dataBase[i][prop] = newUser[prop];
          }
        }
        result = dataBase[i];
      }
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('User with this id not found');
    }
  } else {
    res.status(400).send('Please, provide user id');
  }
});

app.delete(`${endpoint}/:id`, function (req, res) {
  const id = req.params['id'];
  let deleted;
  if (id) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        deleted = dataBase[i];
        dataBase.splice(i, 1);
        break;
      }
    }
    if (deleted) {
      res.status(200).send(`User with id ${deleted.id} has been deleted`);
    } else {
      res.status(404).send('User with this id not found');
    }
  } else {
    res.status(400).send('Please, provide id');
  }
});

module.exports = app;