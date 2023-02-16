const express = require("express");
const { Doctor } = require("../database/Doctor");
const auth = require("../middlewares/auth");

const authMiddleware = require("../middlewares/auth");

const doctorRouter = express.Router();

doctorRouter.get("/", async (req, res) => {
  const { department, page, gender, price, yearexp } = req.query;
  let data = [];
  try {
    if (department && page && gender && price) {
      data = await Doctor.find({ department, gender })
        .sort({ price })
        .limit(6)
        .skip(page * 5);
    } else if (department && page && gender && yearexp) {
      data = await Doctor.find({ department, gender })
        .sort({ yearexp })
        .limit(6)
        .skip(page * 5);
    } else if (department && page && gender) {
      data = await Doctor.find({ department, gender })
        .limit(6)
        .skip(page * 5);
    } else if (department && page && price) {
      data = await Doctor.find({ department })
        .sort({ price })
        .limit(6)
        .skip(page * 5);
    } else if (department && page && yearexp) {
      data = await Doctor.find({ department })
        .sort({ yearexp })
        .limit(6)
        .skip(page * 5);
    } else if (department && gender && price) {
      data = await Doctor.find({ department, gender }).sort({ price }).limit(6);
    } else if (department && gender && yearexp) {
      data = await Doctor.find({ department, gender })
        .sort({ yearexp })
        .limit(6);
    } else if (page && gender && price) {
      data = await Doctor.find({ gender })
        .sort({ price })
        .limit(6)
        .skip(page * 5);
    } else if (page && gender && yearexp) {
      data = await Doctor.find({ gender })
        .sort({ yearexp })
        .limit(6)
        .skip(page * 5);
    } else if (department && page) {
      data = await Doctor.find({ department })
        .limit(6)
        .skip(page * 5);
    } else if (department && gender) {
      data = await Doctor.find({ department, gender }).limit(6);
    } else if (department && yearexp) {
      data = await Doctor.find({ department }).sort({ yearexp }).limit(6);
    } else if (department && price) {
      data = await Doctor.find({ department }).sort({ price }).limit(6);
    } else if (gender && price) {
      data = await Doctor.find({ gender }).sort({ price }).limit(6);
    } else if (gender && yearexp) {
      data = await Doctor.find({ gender }).sort({ yearexp }).limit(6);
    } else if (page && gender) {
      data = await Doctor.find({ gender })
        .limit(6)
        .skip(page * 5);
    } else if (page && yearexp) {
      data = await Doctor.find()
        .sort({ yearexp })
        .limit(6)
        .skip(page * 5);
    } else if (page && price) {
      data = await Doctor.find()
        .sort({ price })
        .limit(6)
        .skip(page * 5);
    } else if (yearexp) {
      data = await Doctor.find().limit(6).sort({ yearexp });
      // return res.send({ doctorData: data });
    } else if (price == -1 || price == 1) {
      data = await Doctor.find({}).limit(6).sort({ price });
      // return res.send({ doctorData: data });
    } else if (gender) {
      data = await Doctor.find({ gender }).limit(5);
      // return res.send({ doctorData: data });
    } else if (department) {
      data = await Doctor.find({ department }).limit(6);
      // return res.send({ doctorData: data });
    } else if (page) {
      data = await Doctor.find()
        .limit(6)
        .skip(page * 5);
      return res.send({ doctorData: data });
    } else {
      data = await Doctor.find().limit(6);
    }
    // console.log(count);
    // count = count / 5;
    return res.send({ doctorData: data });
  } catch (e) {
    return res.status(404).send({ error: "Unable to fetch doctor data" });
  }
});

// doctorRouter.post("/", authMiddleware, createPost);
doctorRouter.post("/", auth, async (req, res) => {
  try {
    //req.name and other data
    return res.send({ message: "Doctor data added sucessfully" });
  } catch (e) {
    return res.status(404).send({ error: "Unable to fetch doctor data" });
  }
});

module.exports = doctorRouter;
