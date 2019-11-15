const express = require('express');
const app = express();




app.get('/:date', (req,res)=>{

    var day = req.params.date.slice(0,2);
    var month = req.params.date.slice(3,5);
    var year = req.params.date.slice(6,10);
    res.send(day+month+year)

});
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/static_files/index.html")
})
app.listen(5000, ()=>{

});