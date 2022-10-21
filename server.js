const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//MongoDb Connection Config
mongoose
  .connect("mongodb://localhost:27017/user_db")
  .then((res) => {
    console.log("MongoDb Connected", res);
  })
  .catch((err) => {
    console.log("Mongodb Connection Failed...", err);
  });

app.use(require("./router"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to NodeJs" });
});

app.post("/post-message", (req, res) => {
  const requestBody = req.body;
  res.status(200).json({ requestBody });
});

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));
