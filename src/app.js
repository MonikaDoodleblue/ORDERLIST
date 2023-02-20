require('../src/db');
require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const routes = require('./router');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

routes.apiRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});