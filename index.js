const express = require("express");
const mongoose = require("mongoose");
const routerApi = require('./src/routers')
const app = express();
require('dotenv').config()
const port = process.env.PORT

app.listen(port, () => console.log("escuchando el puerto ", port));
 
app.get('/',(req, res)=>{
  res.json({0:0})
})

mongoose.connect(process.env.MONGODB_STRING_CONNESTION)
        .then(console.log('conectado con mongo db'))
        .catch((error)=> console.log({message : error}));
  
app.use(express.json())
routerApi(app)   