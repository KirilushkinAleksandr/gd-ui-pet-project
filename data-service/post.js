const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const endpoint = '';
const crypto = require("crypto");

let dataBase = require('./db/posts.json').dataBase;
let usersDB = require('./db/users.json').dataBase;
let tagsDB = require('./db/tags.json').dataBase;

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
      res.status(404).send('Post with this id not found');
    }
  } else {
    res.status(400).send('Request failed. Please, provide correct post id');
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
  const post = req.body;
  const id = crypto.randomBytes(2).toString("hex");
  const newPost = {
    id: id,
    author: checkUser(post.authorID),
    tags: checkTags(post.tagIDs),
    text: post.text || "None"
  };
  if (!newPost.author) {
    res.status(400).send('Request failed. Please, provide correct user id');
  }
  else {
    dataBase.push(newPost);
    res.status(200).send(newPost);
  }
});

function checkUser(id) {
  for (let i = 0; i < usersDB.length; i++) {
    if (usersDB[i].id === id) {
      return `${usersDB[i].name} ${usersDB[i].surname}`;
    }
  }
  return false;
}

function checkTags(tagIDs) {
  const foundTags = [];
  for (let i = 0; i < tagsDB.length; i++) {
    if (tagIDs.includes(tagsDB[i].id)) {
      foundTags.push(tagsDB[i].text);
    }
  }
  return foundTags;
}

app.put(`${endpoint}/:id`, function (req, res) {
  const id = req.params['id'];
  let result;
  const update = req.body;
  if (id && checkUser(req.body.authorID)) {
    for (i = 0; i < dataBase.length; i++) {
      if (dataBase[i].id === id) {
        for (const prop in update) {
          if (dataBase[i].hasOwnProperty(prop)) {
            dataBase[i][prop] = update[prop];
          }
        }
        result = dataBase[i];
      }
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Post with this id not found');
    }
  } else {
    res.status(400).send('Request failed. Please, provide correct post && user id');
  }
});

app.delete('/:id', function (req, res) {
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
      res.status(200).send(`Post with id ${deleted.id} has been deleted`);
    } else {
      res.status(404).send('Post with this id not found');
    }
  } else {
    res.status(400).send('Please, provide id');
  }
});

module.exports = app;