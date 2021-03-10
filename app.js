require("dotenv").config();
require("./config/db.config")();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));
require("./config/passport.config")(app);

const CONNECTION_URL =
  "mongodb+srv://musicdo:ironhack.musicdo@cluster0.yvrwc.mongodb.net/myFirstDatabase?retryWrites=true";

const postsRouter = require("./routes/posts.routes");
app.use("/posts", postsRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
