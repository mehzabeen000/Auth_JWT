const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require("mongoose")

const users = require('./models/reg');
const routes = require('./routes/user')


const url = 'mongodb://localhost:27017/AUTH_JWT'
const connect = mongoose.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

connect.then((db)=>{
    console.log('Connected correctly to server');
  },(err)=>{console.log(err)});

const hostname = "localhost";
const port = 3000;

app.use(express.json());

app.use('/users',routes);



// app.use(auth);

app.listen(port,hostname,()=>{
    console.log(`Connected Successfully at http://${hostname}:${port}`)
})