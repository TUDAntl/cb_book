const express = require('express');
const app = express();
const checkDateRoute = require('./routes/dateRoute');
const mainRoute = require('./routes/mainRoute');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');

app.engine('handlebars', exhbs());

app.set('view engine', 'handlebars');
app.use(bodyParser.json());


app.use('/check', checkDateRoute);
app.use('/', mainRoute);


//Start server on port
app.listen(5000, ()=>{

});