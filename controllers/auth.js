const { User } = require("../database/User");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const axios = require("axios");
const brcypt = require("bcryptjs");
const { response } = require("express");

function generateToken(user) {
  const { _id, name, email, image } = user;

  return jwt.sign(
    {
      _id,
      name,
      email,
      image,
    },
    config.JWT_SECRET_KEY
  );
}

async function getAllUser(req, res) {
  try {
    let b = await User.find();
    res.send({ data: { b } });
  } catch (err) {
    res.status(501).send({ message: err });
  }
}

async function register(req, res) {
  try {
    let { name, email, password } = req.body;
    console.log(name);

    if (!name || !email || !password) {
      return res.status(400).send({
        error: "Incomplete data",
      });
    }

    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).send({
        error: "User with email already exists",
      });
    }

    password = brcypt.hashSync(password);

    user = await User.create({
      name,
      email,
      signinMethod: "email-password",
      password,
    });

    return res.send({
      message: "Registration successful",
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function appointment(req, res) {
  try {
    let { Appointment, user } = req.body;
    // console.log(Appointment);

    let userData = await User.find({ email: user.email });
    let arr = await userData[0].appointment;
    arr.push(Appointment);
    // userData.appointment.push(Appointment);
    console.log(arr);
    await User.findOneAndUpdate(
      { email: user.email },
      { $set: { appointment: arr } }
    );
    console.log(userData);
    return res.send({ message: "Appointment Booked" });
    // let user = await User.findOne({
    //   email,
    // });
    // if (!name) {
    //   return res.status(400).send({
    //     error: "User does not exists",
    //   });
    // }
    // user = await User.create({
    //   name,
    //   email,
    //   password,
    // })
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function singleUserAppointment(req, res) {
  try {
    let { email } = req.body;
    console.log(email);
    if (!email) return res.status(404).send({ message: "Please Login" });

    let userData = await User.find({ email: email });
    if (userData.length === 0)
      return res.status(404).send({ message: "No Such User" });

    if (userData.appointment === 0)
      return res.send({ message: "Not any appointment book" });

    return res.send({ allAppointment: userData[0].appointment });
  } catch (err) {
    return res.status(500).send({
      error: "Server error please try later",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email);
    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).send({
        error: "User with email does not exist",
      });
    }

    if (!brcypt.compareSync(password, user.password)) {
      return res.status(400).send({
        error: "Wrong password",
      });
    }

    // Create JWT token
    const token = generateToken(user);
    const { _id, name, image } = user;

    return res.send({
      message: "Login successful",
      data: {
        token,
        user: {
          _id,
          name,
          email,
          image,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function signinWithGitub(req, res) {
  try {
    const code = req.params.code;

    // exchange the code with access token
    const url = `https://github.com/login/oauth/access_token`;

    let response = await axios.post(url, null, {
      params: {
        client_id: config.GITHUB_OAUTH_CLIENT_ID,
        client_secret: config.GITHUB_OAUTH_CLIENT_SECRET,
        code: code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    let accessToken = response.data.access_token;
    if (!accessToken) {
      console.log(response.data);
      throw new Error("Something went wrong");
    }

    let url2 = "https://api.github.com/user";

    response = await axios.get(url2, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    let user = response.data;

    let existingUser = await User.findOne({
      signinMethod: "github-oauth",
      githubUsername: user.login,
    });

    if (!existingUser) {
      // First time user is signing in with github
      existingUser = await User.create({
        name: user.name,
        email: user.email,
        image: user.avatar_url,
        signinMethod: "github-oauth",
        githubUsername: user.login,
      });
    }

    // Create JWT token
    const token = generateToken(existingUser);
    const { _id, name, image, email } = existingUser;

    return res.send({
      message: "Login with github successful",
      data: {
        token,
        user: {
          _id,
          name,
          email,
          image,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

async function getLoggedInUser(req, res) {
  try {
    const user = req.user;

    return res.send({
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

module.exports = {
  register,
  login,
  signinWithGitub,
  getLoggedInUser,
  getAllUser,
  appointment,
  singleUserAppointment,
};
