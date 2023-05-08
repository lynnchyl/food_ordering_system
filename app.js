const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router')

app.use(bodyParser.json());

app.use('/', router);

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});