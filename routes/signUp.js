const express = require("express");
const { register, login, appointment } = require("../controllers/auth");
const signUpRouter = express.Router();

signUpRouter.post("/", register);
signUpRouter.post("/logIn", login);
signUpRouter.post("/appoint", appointment);

module.exports = signUpRouter;
