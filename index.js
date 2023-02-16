const express = require("express");
const app = express();
app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Yo!");
});
app.listen(process.env.PORT || 3000);

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const path = require("path");

// const connectDatabase = require("./config/connectDatabase");
// const authRouter = require("./routes/auth");
// const doctorRouter = require("./routes/doctor");
// const signUpRouter = require("./routes/signUp");
// const generateotpRoute = require("./routes/generateotp");

// const app = express();

// app.all("/", (req, res) => {
//   console.log("Just got a request!");
//   res.send("Yo!");
// });

// app.use(express.json());
// app.use(cors());
// app.use(morgan("tiny"));

// app.get("/hello", (req, res, next) => {
//   res.send("Hello there");
//   next();
// });

// app.use("/signUp", signUpRouter);
// // app.use("/users", authRouter);
// app.use("/doctor", doctorRouter);
// app.use("/generateotp", generateotpRoute);

// // app.use('/api/comment', commentRouter);

// // app.use("/", express.static("static"));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "static/index.html"));
// // });

// const port = process.argv[2] || 3035;

// connectDatabase().then(() => {
//   app.listen(port, () => {
//     console.log(
//       `Server listening to http requests on http://localhost:${port}`
//     );
//   });
// });
