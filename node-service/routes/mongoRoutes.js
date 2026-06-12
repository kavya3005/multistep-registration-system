const express = require("express");

const router = express.Router();

const RegistrationSession =
  require("../models/RegistrationSession");

const StepLog =
  require("../models/StepLog");

const HelpEmbedding =
  require("../models/HelpEmbedding");


// GET HELP
router.get("/help", async (req, res) => {

  const data = await HelpEmbedding.find();

  res.json(data);

});


// GET SESSIONS
router.get("/sessions", async (req, res) => {

  const data = await RegistrationSession.find();

  res.json(data);

});


// SAVE SESSION
router.post("/sessions", async (req, res) => {

  try {

    const session =
      new RegistrationSession(req.body);

    await session.save();

    res.json(session);

  } catch (error) {

    res.status(500).json(error);

  }

});


// GET LOGS
router.get("/logs", async (req, res) => {

  const data = await StepLog.find();

  res.json(data);

});


// SAVE LOG
router.post("/logs", async (req, res) => {

  try {

    const log =
      new StepLog(req.body);

    await log.save();

    res.json(log);

  } catch (error) {

    res.status(500).json(error);

  }

});
router.put("/sessions/:id", async (req,res)=>{

  const data =
    await RegistrationSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );

  res.json(data);

});
router.delete("/sessions/:id", async (req,res)=>{

  await RegistrationSession.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:"Deleted Successfully"
  });

});
router.put("/logs/:id", async (req,res)=>{

  const data =
    await StepLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );

  res.json(data);

});
router.delete("/logs/:id", async (req,res)=>{

  await StepLog.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message:"Deleted Successfully"
  });

});
// ADD HELP
router.post("/help", async (req, res) => {

  try {

    const help =
      new HelpEmbedding(req.body);

    await help.save();

    res.json(help);

  } catch (error) {

    res.status(500).json(error);

  }

});


// DELETE HELP
router.delete("/help/:id", async (req, res) => {

  try {

    await HelpEmbedding.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Help Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json(error);

  }

});
// SEARCH REGISTRATIONS
router.get("/search/:key", async (req, res) => {

  try {

    const key = req.params.key;

    const data =
      await RegistrationSession.find({
        $or: [
          {
            "data.fullname": {
              $regex: key,
              $options: "i"
            }
          },
          {
            "data.email": {
              $regex: key,
              $options: "i"
            }
          },
          {
            "data.username": {
              $regex: key,
              $options: "i"
            }
          }
        ]
      });

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }

});
// PAGINATED SESSIONS
router.get(
  "/sessions/page/:page/:size",
  async (req, res) => {

    const page =
      Number(req.params.page);

    const size =
      Number(req.params.size);

    const data =
      await RegistrationSession.find()
        .skip((page - 1) * size)
        .limit(size);

    res.json(data);

  }
);

module.exports = router;