const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ticket = require('../models/ticket');


router.get('/ticket', (req, res) =>{
    Ticket.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
    
});

router.get('/createForm', function (req, res,html) {
  res.sendFile(path.join(
      '/Users/student/Documents/Documents - STUSD1040/dev/ticketCapstone/createForm.html'
  ));
});

router.post('/ticket', (req, res) =>{

    if(req.body.action){
        Ticket.create(req.body)
          .then(data => res.json(data))
          .catch(next)
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
    .catch(next)
});

module.exports = router;