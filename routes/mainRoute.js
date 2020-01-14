const express = require('express');
const router = express.Router();
var today = new Date();

var day = today.getDate();
var month = today.getMonth();
month++;
if(month<10){
    month=String('0')+String(month);
}
var year = today.getFullYear();

var todayRoute = '/check/'+String(day)+'_'+String(month)+'_'+String(year)
console.log(month.length);
router.get('/', (req, res) => {
res.redirect(todayRoute);

});

module.exports = router;