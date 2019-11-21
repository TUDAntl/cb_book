const express = require('express');
const app = express();
const checkDateRoute = require('./routes/dateRoute');
const mainRoute = require('./routes/mainRoute');
const editRoute = require('./routes/editRoute');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const sqlite3 = require('sqlite3').verbose();
const dbname = String(new Date().getMonth()+1)+'_'+String(new Date().getFullYear())+'.db';
const sqlpath = __dirname.substring(0, __dirname.length-7)+dbname;


let db = new sqlite3.Database(sqlpath,(err)=>{
    if (err){
        console.log("no succses");
        return console.error(err.message);
    }
});
db.serialize(()=>{
    db.run( "CREATE TABLE IF NOT EXISTS reservierungen (date INTEGER NOT NULL, time INTEGER NOT NULL, name TEXT NOT NULL, pax INTEGER NOT NULL, tisch INTEGER, desc TEXT, id TEXT PRIMARY KEY) ");
});


db.close();


app.engine('handlebars', exhbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/check', checkDateRoute);
app.use('/', mainRoute);
app.use('/edit', editRoute);



//Start server on port
app.listen(5000, ()=>{
console.log("Started server at port 5000");
});