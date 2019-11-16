const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;



router.get('/', (req,res)=>{
    MongoClient.connect("mongodb://Reservierungen",{ useUnifiedTopology: true}, function(err, db) {
        if(!err) {
        }
    });
    res.render(__dirname.substring(0, __dirname.length-6)+'views/index',{layout: false, title: "Reservierungsbuch", time1:18, name1:"Thomas", pax1:6, table1:11, time1:"18:00", 
                                                                                                                name2:"Brunner", pax2:5, table2:4, time2:"20:15", description2:"geht ins Theater"})});

    module.exports = router;