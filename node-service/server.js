const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoRoutes =
  require("./routes/mongoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/multistepdb")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", mongoRoutes);

app.listen(5000, () => {
  console.log("Node Server Running On Port 5000");
});