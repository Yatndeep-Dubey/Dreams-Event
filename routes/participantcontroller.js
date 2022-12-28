var express = require('express');
const party = require('../models/party');
const router = express.Router();
const participants = require("../models/participants");


router.get("/add_participant", (req,res)=>{
    res.render("participant/add_participant");
});

router.post("/add_participant", async (req, res) => {
      const singleparticipant = new participants
      ({
         name:req.body.name,
         partycode:req.body.partycode,
         mobile:req.body.mobile,
         time:req.body.time,
         contribution:req.body.contribution,      
    })
    try {
        const newparticipant = await singleparticipant.save();
        res.redirect("/participant/add_participant");
      }
       catch (error){
        res.send(error.messege)
    }
});

module.exports = router;