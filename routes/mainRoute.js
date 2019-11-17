const express = require('express');
const router = express.Router();
var today = new Date();

var day = today.getDate();
var month = today.getMonth();
var year = today.getFullYear();

var todayRoute = '/check/'+String(day)+'_'+String(month+1)+'_'+String(year)

router.get('/', (req, res) => {
res.redirect(todayRoute);

});

module.exports = router;