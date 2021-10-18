// external imports / dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// middlewares
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

// routes / routers
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const usersRouter = require("./routes/usersRouter");
const inboxRouter = require("./routes/inboxRouter");

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoConnectionString = process.env.MONGO_URL;

// application config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.set("view engine", "ejs");

// database connection
mongoose
  .connect(mongoConnectionString)
  .then(() => console.log("-> database connection successful"))
  .catch((err) => console.log(err.message || err));

// for rendering the login page and handling the login related stuffs
app.use("/", loginRouter);
// for rendering the signup page and handling the signup related stuffs
app.use("/signup", signupRouter);
// for rendering the signup page and handling the users related stuffs
app.use("/users", usersRouter);
// for rendering the inbox page and handling the inbox related stuffs
app.use("/inbox", inboxRouter);

// * error handlings
app.use(notFoundHandler);
app.use(errorHandler);

// staring the server
app.listen(port, () => console.log(`-> listening to port [${port}]`));
