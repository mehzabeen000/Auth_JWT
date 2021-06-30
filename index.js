const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const mongoose = require("mongoose")

const users = require('./models/reg');
const leadersRouter = require('./routes/leaders');
const routes = require('./routes/user')


const url = 'mongodb://localhost:27017/AUTH_JWT'
const connect = mongoose.connect(url,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

connect.then((db)=>{
    console.log('Connected correctly to server');
  },(err)=>{console.log(err)});

const hostname = "localhost";
const port = 3000;

app.use(express.json());

function checktoken(req,res,next){
  var token = req.headers.cookie
  if(token==undefined){
    res.send({
      "error": {
      "code": "AUTH_01",
      "message": "Access Unauthorized",
      "field": "NoAuth"
          }
      })
  }else{
    var token = req.headers.cookie.split(" ")
    token = token[0].slice(0,-10)
    jwt.verify(token ,"secret",(err,data)=>{ 
      if(!err){
          next()
      }else{
          res.send({
              "error": {
                  "status": 401,
                  "code": "AUT_02",
                  "message": "Access Unauthorized",
                  "field": "NoAuth"
              } })
      }
  }) 
}
    }

app.use('/users',routes);
app.use(checktoken);
app.use('/leaders',leadersRouter);




app.listen(port,hostname,()=>{
    console.log(`Connected Successfully at http://${hostname}:${port}`)
})