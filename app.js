const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoConnectionString = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.set("view engine", "ejs");

mongoose
  .connect(mongoConnectionString)
  .then(() => console.log("-> database connection successful"))
  .catch((err) => console.log(err.message || err));

app.use("/", loginRouter);
app.use("/signup", signupRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`-> listening to port [${port}]`));
