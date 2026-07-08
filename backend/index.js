require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

require("./passport");

const authRoute = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello from express server");
});

app.listen(PORT, () => {
  console.log(`hello from express server localhost port ${PORT}`);
});