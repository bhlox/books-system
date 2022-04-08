const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`SERVER IS RUNNING AT http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

//   routes
app.use(require("./routes/route"));
