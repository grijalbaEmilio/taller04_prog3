/* importación del dendgrid */
const sgMail = require("@sendgrid/mail");
const express = require("express");
const mongoose = require("mongoose");
const routerApi = require("./src/routers");
const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require("./src/handlers/error.handler");
const app = express();
require("dotenv").config();

/* importacion de twliot*/
const port = process.env.PORT;
const acoontSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_client = require("twilio")(acoontSID, authToken);


//para sms con twlio
 twilio_client.messages
  .create({
    body: "mensaje desde node.js",
    from: "+17655409843",
    to: "+573125523854"
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.log(error)); 


  //para whatsapp con twilio
  twilio_client.messages
  .create({
     body : 'hola manu',
     to: 'whatsapp:+573125523854',
     from: 'whatsapp:+14155238886'
   })
  .then(call => console.log(call.sid)).catch(error => console.log(error))

app.listen(port, () => console.log("escuchando el puerto ", port));

mongoose
  .connect(process.env.MONGODB_STRING_CONNESTION)
  .then(console.log("conectado con mongo db"))
  .catch((error) => console.log({ message: error }));

app.use(express.json());
app.use(logError);
app.use(errorHandler);
app.use(boomErrorHandler);
routerApi(app);


/* pa dendgrid */
const email = require("./src/emailSendGrid/emaiSendGrid");
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.post('/api/v1/confirmacion', async (req, res, next) => {
  try {
    res.json(await email.sendOrder(req.body))
  } catch (error) {
    next(error)
  } 
})

app.use((err, req, res, next) =>{
  const statusCode = err.statuscode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({message : err.message})
  return
})