require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 1000;

async function start() {
  app.get("/",(req, res) => {

    res.send("ok");
  });
  app.listen(PORT, () => {
    console.log(`server rin at localhost:${PORT}`);
  });
}
start()
