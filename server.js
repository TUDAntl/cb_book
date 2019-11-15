const express = require('express');
const app = express();



app.use(express.static('static_files'));

app.get('/:date', (req,res)=>{

    var day = req.params.date.slice(0,2);
    res.send(day)

});
app.get('/', (req,res)=>{
    res.send(index.html)
})
app.listen(5000, ()=>{

});