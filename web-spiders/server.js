const express = require("express");
const morgan = require("morgan");
const { success, error, info } = require("consola");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { PORT, NODE_ENV } = require("./config/index");
const Errorhandler = require("./middlewares/ErrorHandler");
const courseRoute = require("./routes/courseRoute");
const authRoute = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const studentRoute = require("./routes/studentRoute");
let app = express();

let startServer = async () => {
  try {
    connectDB();
    if (NODE_ENV === "development") {
      app.use(morgan("dev"));
    }

    // injecting middlewares
    app.use(express.json({ extented: true }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // mounting the routes
    app.use("/api/auth", authRoute);
    app.use("/api/course", courseRoute);
    app.use("/api/profile", profileRoute);
    app.use("/api/student", studentRoute);

    // error handling middleware
    app.use(Errorhandler);
    app.listen(PORT, (err) => {
      if (err) throw err;
      info(`web spider app is running on ${PORT}`);
    });
  } catch (err) {
    error(err);
  }
};

startServer();
