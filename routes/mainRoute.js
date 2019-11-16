const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;




router.get('/', (req,res)=>{
    MongoClient.connect("mongodb://Reservierungen",{ useUnifiedTopology: true}, function(err, db) {
        if(!err) {
        }
    });
    res.render('index')});

    module.exports = router;