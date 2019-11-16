const express = require('express');
const app = express();
const checkDateRoute = require('./routes/dateChecks');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/check', checkDateRoute);


//Startseite
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/static_files/index.html")
});


//Start server on port
app.listen(5000, ()=>{

});