const express = require('express');
const Post = require('../Reservierung')
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbname = String(new Date().getMonth()+1)+'_'+String(new Date().getFullYear())+'.db';
const sqlpath = __dirname.substring(0, __dirname.length-14)+dbname;
var today = new Date(); 


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

router.get('/:date', async(req,res)=>{
    var day = req.params.date.slice(0,2);
    var month = req.params.date.slice(3,5);
    var year = req.params.date.slice(6,10);
    var whereStatement='WHERE date = ' + String(day);
    let db = new sqlite3.Database(sqlpath,(err)=>{
        if (err){
            console.log("no succses");
            return console.error(err.message);
        }
    });
    reservierungen = [];
    db.serialize(()=>{
    db.each("SELECT time, name, pax,tisch, desc FROM reservierungen " + whereStatement,(err, row)=>{
        var res = {date: day, time: row.time, name: row.name, pax: row.pax, tisch:row.tisch, desc:row.desc};
        reservierungen.push(res);
    });
});
await sleep(500);

    console.log(reservierungen);
    db.close();
    var jdata={layout: false, title: "Reservierungsbuch", allres:reservierungen};    
    res.render(__dirname.substring(0, __dirname.length-6)+'views/index',jdata);

});


router.post('/', (req,res)=>{

    let db = new sqlite3.Database(sqlpath,(err)=>{
        if (err){
            console.log("no succses");
            return console.error(err.message);
        }
    });
    var sqlcommand = " INSERT INTO reservierungen Values";
    var values= '(' + String(req.body.date) + ',' + String(req.body.time) + ',"' + String(req.body.name)+ '",' + String(req.body.pax) + ',' + String(req.body.tisch) + ',' +'"'+String(req.body.desc)+'" )';
    console.log(sqlcommand,values);
    db.run(sqlcommand+values);
    res.redirect('/check/17_11_2019');
});

module.exports = router;