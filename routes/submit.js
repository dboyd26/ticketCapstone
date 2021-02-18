const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ticket = require('../models/ticket');


router.get('/ticket', (req, res) =>{
    Ticket.find({}, 'action')
    .then(data => res.json(data))
    .catch(error => console.log(error)) //make sure your code looks like this
    
});



router.post('/ticket', (req, res) =>{

    if(req.body.action){
        Ticket.create(req.body)
          .then(data => res.json(data))
          .catch(error => console.log(error))
      }else {
        res.json({
          error: "The input field is empty"
        })
      }
});

//put post later

router.delete('ticket/:id' , (req, res) => {
    Ticket.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(error => console.log(error))
});

module.exports = router;