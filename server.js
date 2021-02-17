const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/submit');//come back to that later.
const path = require('path');
require ('dotenv').config();

const port = process.env.PORT || 3000;

//connecting to database


  mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs')


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/submit', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
















