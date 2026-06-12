const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoRoutes = require("./routes/mongoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("MultiStep Registration System Backend Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.use("/api", mongoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Node Server Running On Port ${PORT}`);
});