const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const Task = require("./models/todo");

const app = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/mongoose");
const { ensureAuthenticated } = require("./config/auth");

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.get("/dashboard", ensureAuthenticated, function (req, res) {
  //we use get request and response here

  Task.find(
    {
      // in this we can pass query by finding it (id) in the database
    },
    function (err, tasks) {
      if (err) {
        console.log("error in fetching data from mongodb");
        return;
      }
      return res.render("dashboard", {
        title: "My_Todo_List",
        todo_list: tasks,
      });
    }
  );
});

app.post("/dashboard/create-Task", function (req, res) {
  // after filling the form and submitting it , we  will go through the action route

  // To create our todo/tast in data base we are using Task.create function here

  Task.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, newTask) {
      if (err) {
        console.log("error in creating a task");
        return;
      }
      console.log("New Task is created", newTask);

      return res.redirect("back");
    }
  );
});

app.get("/dashboard/delete-task/", function (req, res) {
  let id = req.query;

  var count = Object.keys(id).length;

  for (let i = 0; i < count; i++) {
    Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("error in deleting an object from the database");
      }

      console.log("function is called");
    });
  }
  res.redirect("back");
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
