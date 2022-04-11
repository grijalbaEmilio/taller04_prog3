const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfiirmation(customerName, orderNroSerie) {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  
  <div style="padding : 45px; text-align: center;">
    <h3>afiche promocional enviado desde el back end NODE</h3>
    <p>hola ${customerName} has resivido la orden número ${orderNroSerie}</p>
    <img src="https://image.shutterstock.com/image-vector/promotional-brochure-designs-delicious-fast-260nw-1903324243.jpg" alt="" srcset="">
  </div>

</body>

</html>
  `;
}

function getMessage(emailParams) {
  /* establecemos los jparamentros requeridos  */
  return {
    to: emailParams.toEmail,
    from: "luisegrijalba8@gmail.com",
    subject: "primera prueba con sendgrid",
    text: `hola ${emailParams.customername} te enviamos este correo porque ajá` ,
    html: sendEmailConfiirmation(
      emailParams.customername,
      emailParams.orderNro
    ),
  };
}

async function sendOrder(emailParams) {
  console.log(emailParams);
  try {
    await sgMail.send(getMessage(emailParams))
    return { message : 'configuración de pedido recibido, ha sido enviada'}
  } catch (error) {
    const message = 'No se pudo enviar la orden de compra al ciente'
    console.error(message);
    console.error(error);
    if(error.response) console.error(error.response.body);
    return {message}
  }
}

module.exports = {sendOrder}
