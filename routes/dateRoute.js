const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbname = String(new Date().getMonth() + 1) + '_' + String(new Date().getFullYear()) + '.db';
const sqlpath = __dirname.substring(0, __dirname.length - 14) + dbname;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


router.get('/:date', async (req, res) => {
    terror = false;
    var day = req.params.date.slice(0, 2);
    var month = req.params.date.slice(3, 5);
    var year = req.params.date.slice(6, 10);
    var whereStatement = 'WHERE date = ' + String(day);
    let db = new sqlite3.Database(sqlpath, (err) => {
        if (err) {
            console.log("no succses");
            return console.error(err.message);
        }
    });
    reservierungen = [];
    db.serialize(() => {
        db.each("SELECT time, name, pax, tisch, desc, id FROM reservierungen " + whereStatement, (err, row) => {
            var res = { date: day, time: row.time, name: row.name, pax: row.pax, tisch: row.tisch, desc: row.desc, id:row.id};
            reservierungen.push(res);
        });
    });


    await sleep(500);
    reservierungen.sort(function (a, b) {
        return a.time - b.time;
    });
    reservierungen.sort();
    db.close();
    var jdata = { layout: false, title: "Reservierungsbuch", allres: reservierungen, error: terror, day: day, month: month, year: year };
    res.render(__dirname.substring(0, __dirname.length - 6) + 'views/index', jdata);

});



router.post('/:date', (req,res)=>{
var day = req.body.date.slice(8);
var month = req.body.date.slice(5,7);
var year = req.body.date.slice(0,4);

var pRoute = '/check/' + day + '_' + month + '_' + year;
res.redirect(pRoute);
});

router.post('/', (req, res) => {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    terror = false;
    let db = new sqlite3.Database(sqlpath, (err) => {
        if (err) {
            console.log("no succses");
            return console.error(err.message);
        }
    });
    var parsedDesc, parsedPax, parsedTisch, parsedTime;
    if (req.body.desc == "") {
        parsedDesc = "-";
    } else {
        parsedDesc = String(req.body.desc);
    }
    if (req.body.pax == "") {
        parsedPax = "0";
    } else {
        parsedPax = String(req.body.pax);
    }
    if (req.body.tisch == "") {
        parsedTisch = "0";
    } else {
        parsedTisch = String(req.body.tisch);
    }
    if (req.body.time == "" || req.body.name == "") {
        terror = true;

    } else {
        parsedTimeRaw = String(req.body.time);
        parsedHour = parsedTimeRaw.slice(0, 2);
        parsedMinute = parsedTimeRaw.slice(3, 6);
        if (parsedMinute.length == 1) {
            parsedMinute = "0" + parsedMinute;
        }
        parsedTime = parsedHour + parsedMinute;
        var sqlcommand = " INSERT INTO reservierungen Values";
        var ID =  Math.random().toString(36).substr(2, 9);
        var values = '(' + String(day) + ',' + parsedTime + ',"' + String(req.body.name) + '",' + parsedPax + ',' + parsedTisch + ',' + '"' + parsedDesc + '","'+ String(ID)+'" )';
        console.log(sqlcommand, values);
        db.run(sqlcommand + values);
    }
    var todayRoute = '/check/' + String(day) + '_' + String(month + 1) + '_' + String(year)
    data = { error: terror };
    res.redirect(todayRoute);


});

module.exports = router;