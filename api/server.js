'use strict';



const express = require('express');

const app = express();

const jwt = require('jsonwebtoken');

const cors = require('cors');

const bodyParser = require('body-parser');

const data = require('./data');

const middleware = require('./middleware');



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/api/products', (req, res) => { //lists all  available products
  console.log("request received for get products");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FashionStore");
    dbo.collection("products").findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result.name);
      let rrr = [];
      rrr.push(result);
      res.send(rrr);
      db.close();
    });
  });
  //return res.json(data.products);

});



// app.post('/api/products', (req, res) => { //generates the list of products in the cart

//   let products = [], id = null;

//   let cart = JSON.parse(req.body.cart);

//   if (!cart) return res.json(products)

//   for (var i = 0; i < data.products.length; i++) {

//     id = data.products[i].id.toString();

//     if (cart.hasOwnProperty(id)) {

//       data.products[i].qty = cart[id]

//       products.push(data.products[i]);

//     }

//   }

//   return res.json(products);

// });


app.post('/api/products', (req, res) => { //generates the list of products in the cart

  let products = [], id = null;

  let cart = JSON.parse(req.body.cart);

  if (!cart) return res.json(products)

  for (var i = 0; i < data.products.length; i++) {

    id = data.products[i].id.toString();

    if (cart.hasOwnProperty(id)) {

      data.products[i].qty = cart[id]

      // products.push(data.products[i]);



      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://localhost:27017/";

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("FashionStore");
        var tempobj = data.products[i];
        dbo.collection("products").insertOne(tempobj, function (err, res) {
          if (err) throw err;
          console.log("Product added.");
          db.close();
        });
      });




    }

  }

  return res.json(products);

});



app.post('/api/auth', (req, res) => { //signs in user

  let user = data.users.filter((user) => {

    return user.name == req.body.name && user.password == req.body.password;

  });

  if (user.length) {

    // create a token using user name and password vaild for 2 hours

    let token_payload = { name: user[0].name, password: user[0].password };

    let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });

    let response = {
      message: 'Token Created, Authentication Successful!',

      token: token
    };



    // return the information including token as JSON

    return res.status(200).json(response);



  } else {

    return res.status("401").json("Authentication failed. admin not found.");

  }

});



app.get('/api/pay', middleware, (req, res) => { //checkout route for signed in users

  return res.json("Payment Successful!");

});




const PORT = 5000;



app.listen(PORT);

console.log('api runnging on port ' + PORT + ': ');