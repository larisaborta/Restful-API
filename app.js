const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Import routes
const postsRoute = require("./routes/posts");

//Middlewares = function that executes when routes are being hit
app.use("/posts", postsRoute);
app.use(bodyParser.json());
app.use(cors());

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

app.get("/", (req, res) => {
  res.send("We are on home");
});

app.listen(3000);
