var express = require("express");
const router = express.Router();
const Party = require("../models/party");
const participant=require("../models/participants")




router.get("/login", (req, res) => {
  res.render("student/login");
});
router.post("/login", async (req, res) => {

    const partycode1 = req.body.partycode;
    const individualStudent = await Party.find({partycode:partycode1});
    if(!individualStudent){
      res.render("student/login", {
        error : "Login with correct user name"
      })
    }
   
    res.render("student/view", { one : individualStudent})
});

module.exports = router;

