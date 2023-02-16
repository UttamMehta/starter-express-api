const express = require("express");
const { register, login, appointment } = require("../controllers/auth");
const signUpRouter = express.Router();

signUpRouter.post("/", register);
signUpRouter.post("/logIn", login);
signUpRouter.post("/appoint", appointment);

signUpRouter.get("*", (req, res) => {
  res.status(400).send({
    message: "Wrong Search",
  });
});

module.exports = signUpRouter;
