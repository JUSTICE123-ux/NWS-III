const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const router = require("./routes/user.route");

const PORT = process.env.PORT;
const URL = process.env.URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log(
        `Database is connected and server is running on localhost:${PORT}`
      );
    })
    .catch(() => {
      console.log(
        `Database is not connected and server is running on localhost:${PORT}`
      );
    });
});
