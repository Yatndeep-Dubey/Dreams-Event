const express = require("express");
const app = express();
const port = 5001;
const mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');

mongoose.connect("mongodb+srv://Yatndeep:admin@cluster0.90vwitf.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log(" Database connected"));

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.json());
app.use(express.urlencoded());

const teacherRoutes = require("./routes/teacherlogin")
const studentRoutes = require("./routes/studentlogin")
const participantRoutes= require("./routes/participantcontroller")
app.use("/teacher",teacherRoutes)  // i use this route to
app.use("/student",studentRoutes)
app.use("/participant",participantRoutes)

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});


app.listen(port, () => {
  console.log(`Event app listening at http://localhost:${port}`);
});
