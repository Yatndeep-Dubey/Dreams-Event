var express = require('express');
const party = require('../models/party');
const router = express.Router();
const participant = require("../models/participants");

router.get("/login", (req, res) => {
    res.render("teacher/teacherLogin");
});
router.get("/option", (req,res) => {
    res.render("teacher/option")
})
router.post("/login", (req, res) => {
    if(req.body.password == "asdf"){
        res.redirect("/teacher/option");
    }
    else{
        res.render("teacher/teacherLogin", {
            error : "Please Enter Correct Password !!"
        })
    }
});
router.get("/add", (req, res) => {
    res.render("teacher/addparty");
});
router.get("/edit", (req, res) => {
    res.render("/teacher/showparticipant/:id");
});

router.post("/add", async (req, res) => {
    const singleStudent = new party({
        name : req.body.name,
        venue : req.body.venue,
        date : req.body.date,
        time : req.body.time,
        partycode:req.body.partycode,
        budget:req.body.budget,
        })
    try {
        const newStudent = await singleStudent.save();
        res.redirect("/teacher/viewall");
      } catch (error){
        res.send(error.messege)
    }
});
/////////////////////////////////////////////////
/// adding contributors







///////////////////////////////////////////////////////////////////
router.get("/viewall", async (req, res) => {
    const allStudents = await party.find() 
    res.render("teacher/viewall", {student : allStudents})
});
router.get("/delete/:id", async (req, res) => {
    await party.findByIdAndDelete(req.params.id)
    res.redirect("/teacher/viewall")
});
router.get("/edit/:id", async (req, res) => {
    const user = await party.findById(req.params.id)
    res.render("teacher/edit", {user : user})
});
router.post("/edit/:id", async (req, res) => { 
    const student1=[
        {
               name:req.body.participant_name,
               contribution:req.body.participant_contri
        }
    ]
    const user = await party.findByIdAndUpdate(req.params.id,{$push:{student:student1}})
    res.redirect("/teacher/viewall")
});
////////////////////////////////////////.........//.....//////
router.get("/showparticipant/:id",async (req,res)=>
{
   const allParticipants=await party.findById(req.params.id) // yaha pe condtion laga ke
    const student1=allParticipants.student;
    /// budget code
  // const student = allParticipants[0].student;
     const budget= allParticipants.budget;
     res.render("participant/showparticipant",{chutiya:student1});    
 })

    ////code for expenses
    router.get("/knowexpenses/:partycode",async(req,res)=>
    {
        const details= await participant.find({partycode:req.params.partycode})
        var contribution=0;
        var previous=0;
        details.forEach(item=>{
            contribution= previous+item.contribution;
            previous=contribution;
   
        }) 
       
       // const result= budget-previous;

        res.render("participant/knowexpenses",{person:details,expense:previous})
    }
    )

module.exports = router;