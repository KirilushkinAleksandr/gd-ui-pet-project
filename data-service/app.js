const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

const post = require('./post');
const user = require('./user');
const tag = require('./tag');

app.use('/post', post)
app.use('/user', user)
app.use('/tag', tag)

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});