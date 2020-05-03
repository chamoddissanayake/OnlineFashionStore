var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var url = dbCon.mongoURIConnString;


// var url1 = "mongodb://localhost:27017/FashionStore";
var url1 = dbCon.mongoURIConnString + "FashionStore";

MongoClient.connect(url1, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("FashionStore");
  dbo.createCollection("products", function (err, res) {
    if (err) throw err;
    console.log("products Collection created!");
    db.close();
  });
});


MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("FashionStore");
  dbo.createCollection("users", function (err, res) {
    if (err) throw err;
    console.log("users Collection created!");
    db.close();
  });
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("FashionStore");
  dbo.createCollection("storeManagers", function (err, res) {
    if (err) throw err;
    console.log("store manager Collection created!");
    db.close();
  });
});

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("FashionStore");
  dbo.createCollection("categories", function (err, res) {
    if (err) throw err;
    console.log("categories Collection created!");
    db.close();
  });
});