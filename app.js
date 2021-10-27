const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const dotenv = require("dotenv");
dotenv.config();

// express app
const app = express();

// connect to mongodb
const dbURI = process.env.DBURI;
const port = process.env.PORT || 8000;
mongoose
  .connect(dbURI)
  .then((result) => result)
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("/public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

app.listen(port);
