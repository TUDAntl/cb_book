const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbname = String(new Date().getMonth() + 1) + '_' + String(new Date().getFullYear()) + '.db';
const sqlpath = __dirname.substring(0, __dirname.length - 14) + dbname;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


router.get('/:id', async (req, res) => {

    var whereStatement = "WHERE id = " + "'"+String(req.params.id)+"'";
    let db = new sqlite3.Database(sqlpath, (err) => {
        if (err) {
            console.log("no succses");
            return console.error(err.message);
        }
    });
    reservierungen = [];
    db.serialize(() => {

        db.each("SELECT * FROM reservierungen " + whereStatement, (err, row) => {
            if(err){
            console.log(err);
        }
            var res = { date: row.date, time: row.time, name: row.name, pax: row.pax, tisch: row.tisch, desc: row.desc };
            reservierungen.push(res);
        });
    });



    await sleep(500);
    var jdata = { layout: false, title: "Reservierungsbuch", allres: reservierungen };
    db.close();
    res.render(__dirname.substring(0, __dirname.length - 6) + 'views/edit', jdata);
});



module.exports = router;