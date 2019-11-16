const express = require('express');
const Post = require('../static_files/Reservierung')
const router = express.Router();


router.get('/:date', (req,res)=>{

    var day = req.params.date.slice(0,2);
    var month = req.params.date.slice(3,5);
    var year = req.params.date.slice(6,10);
    res.send(day+month+year);

});
router.get('/', (req,res)=>{
    res.send();
});

router.post('/', (req,res)=>{
    const reservierung = new Post({
        name: req.body.name,
        size: req.body.size
    })
    console.log(reservierung)
    res.json(reservierung);

});

module.exports = router;