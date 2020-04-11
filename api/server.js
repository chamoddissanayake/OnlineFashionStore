'use strict';



const express = require('express');

const app = express();

const jwt = require('jsonwebtoken');

const cors = require('cors');

const bodyParser = require('body-parser');

const data = require('./data');

const middleware = require('./middleware');
const fetch = require('node-fetch');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


// app.get('/api/products', (req, res) => { //lists all  available products
//   console.log("request received for get products");
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("FashionStore");
//     dbo.collection("products").findOne({}, function (err, result) {
//       if (err) throw err;
//       console.log(result.name);
//       let rrr = [];
//       rrr.push(result);
//       res.send(result);
//       db.close();
//     });
//   });
//   //return res.json(data.products);

// });


app.get('/api/products', (req, res) => { //lists all  available products
  console.log("request received for get products");
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FashionStore");
    dbo.collection("products").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      let rrr = [];
      rrr.push(result);
      res.send(result);
      db.close();
    });
  });
  //return res.json(data.products);

});



app.post('/api/selectitem', (req, res) => { //retrieve details of the selected item
  console.log("request received for the seleced product");
  console.log(req);

  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("FashionStore");
  //   dbo.collection("products").find({}).toArray(function (err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     let rrr = [];
  //     rrr.push(result);
  //     res.send(result);
  //     db.close();
  //   });
  // });
  return res.send({});

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
  // var addStatus = false;

  console.log(req.body.id + req.body.name + req.body.description + req.body.price + req.body.available_quantity);

  var tempItemObj = new Object();

  tempItemObj.id = req.body.id;
  tempItemObj.name = req.body.name;
  tempItemObj.description = req.body.description;
  tempItemObj.price = req.body.price;
  tempItemObj.available_quantity = req.body.available_quantity;

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FashionStore");
    dbo.collection("products").insertOne(tempItemObj, function (err1, res1) {
      if (err1) throw err1;
      console.log("Product added.");
      res.send(true);
      db.close();

    });
  });

});



app.post('/api/auth', (req, res) => { //signs in user

  console.log(req.body.username);
  console.log(req.body.password);

  // var tempLoginUserObj = new Object();

  // tempLoginUserObj.username = req.body.username;
  // tempLoginUserObj.password = req.body.password;

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FashionStore");
    dbo.collection("users").findOne({ username: req.body.username, password: req.body.password }, function (err1, result) {
      if (err1) throw err1;
      console.log(result);

      var currentLoggedInUserObj = new Object();

      currentLoggedInUserObj._id = result._id;
      currentLoggedInUserObj.username = result.username;
      currentLoggedInUserObj.email = result.email;
      currentLoggedInUserObj.type = result.type;



      res.send(currentLoggedInUserObj);
      db.close();
    });
  });



  // let user = data.users.filter((user) => {

  //   return user.name == req.body.name && user.password == req.body.password;

  // });


  // let user = data.users.filter((user) => {

  //   return user.name == req.body.name && user.password == req.body.password;

  // });

  // if (user.length) {

  //   // create a token using user name and password vaild for 2 hours

  //   let token_payload = { name: user[0].name, password: user[0].password };

  //   let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });

  //   let response = {
  //     message: 'Token Created, Authentication Successful!',

  //     token: token
  //   };



  //   // return the information including token as JSON

  //   return res.status(200).json(response);



  // } else {

  //   return res.status("401").json("Authentication failed. admin not found.");

  // }
  // return res.status(200).json(response);

});



app.get('/api/pay', middleware, (req, res) => { //checkout route for signed in users

  return res.json("Payment Successful!");

});

app.delete('/api/products/delete/:id', (req, res) => {
  products.findByIdAndRemove({ _id: req.params.id }, function (err, products) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});




const PORT = 5000;



app.listen(PORT);

console.log('api runnging on port ' + PORT + ': ');