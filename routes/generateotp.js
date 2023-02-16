const express = require("express");
const { User } = require("../database/User");
const generateotpRoute = express.Router();

let otp = "";

generateotpRoute.get("/", async (req, res) => {
  try {
    let z = await Math.floor(Math.random() * (9998 - 5897 + 1) + 5897);
    return res.send({ z });
  } catch (e) {
    return res.status(404).send({ error: "some error" });
  }
});

// generateotpRoute.post("/", async (req, res) => {
//   try {
//     // let saw=User.find({email:req.body.user.email})

//     return res.send({ message: "Appointment booked" });
//   } catch (e) {
//     console.log("error");
//     return res.status(404).send({ error: "some error" });
//   }
// });

module.exports = generateotpRoute;
