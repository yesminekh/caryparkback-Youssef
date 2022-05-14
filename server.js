const express = require("express");
const app = express();
var logger = require("morgan"); 

const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const config = require("./config.json");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors")

app.use(express.static('public'));  
app.use('/img', express.static('uploads/images'));

//*************************   swagger */
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//we want to be informed whether mongoose has connected to the db or not 
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log("Connecté a la base de données");
        },
        (err) => {
            console.log("Connexion a la base de données echouée", err);
        }
    );

const userRoute = require("./routes/user-route");
const parkingRoute = require("./routes/parking-route");
const reservationRoute = require("./routes/reservation-route");

app.use("/api/user", userRoute);
app.use("/api/parking", parkingRoute);
app.use("/api/reservation", reservationRoute);

if (process.env.NODE_ENV === "production") {
    console.log("app in production mode");
    app.use(express.static("client/build"));
    app.get("/*", function (req, res) {
        res.sendFile(
            path.join(__dir, "client", "build", "index.html"),
            function (err) {
                if (err) res.status(500).send(err);
            }
        );
    });
}
app.get('/initializeBraintree', async (req, res) =>  {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "mf8fy8t5g2njfq6c",
    publicKey: "z4ggmqdhxbm6mbzm",
    privateKey: "acc246c8d562daff24dca1a24b65c216"
  });
  let token = (await gateway.clientToken.generate({})).clientToken;
  res.send({data: token});
});

app.post('/confirmBraintree', async (req, res) =>  {
  const data = req.body;
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "mf8fy8t5g2njfq6c",
    publicKey: "z4ggmqdhxbm6mbzm",
    privateKey: "acc246c8d562daff24dca1a24b65c216"
  });
  let transactionResponse = await gateway.transaction.sale({
      amount: data.amount,
      paymentMethodNonce: data.nonce,
      options: {
          submitForSettlement: true
        }
  });
  
  console.log(transactionResponse);
  res.send({data: transactionResponse});
});
app.get('/pay', (req, res) => {



  var create_payment_json = {
 
     
     
     "intent": "sale",
     "payer": {
         "payment_method": "paypal"
     },
     "redirect_urls": {
         "return_url": "http://localhost:3000/success",
         "cancel_url": "http://localhost:3000/cancel"
     },
     "transactions": [{
         "item_list": {
             "items": [{
                 "name": "Red Sox Hat",
                 "sku": "001",
                 "price": '25.00' ,
                 "currency": "USD",
                 "quantity": 1
             }]
         },
         "amount": {
             "currency": "USD",
             "total": "25.00"
         },
         "description": "Hat for the best team ever"
     }]
 };
 
 paypal.payment.create(create_payment_json, function (error, payment) {
   if (error) {
       throw error;
   } else {
       for(let i = 0;i < payment.links.length;i++){
         if(payment.links[i].rel === 'approval_url'){
           res.redirect(payment.links[i].href);
         }
       }
   }
 });
 
 });
 
 app.get('/success', (req, res) => {
   const payerId = req.query.PayerID;
   const paymentId = req.query.paymentId;
 
   const execute_payment_json = {
     "payer_id": payerId,
     "transactions": [{
         "amount": {
             "currency": "USD",
             "total": "25.00"
         }
     }]
   };
 
   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
     if (error) {
         console.log(error.response);
         throw error;
     } else {
         console.log(JSON.stringify(payment));
         res.send('Success');
     }
 });
 });
 
 app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(port, () => console.log(`Server up and running on port ${port} !`));