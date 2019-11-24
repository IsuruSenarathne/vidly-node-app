const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Vidly Api</h1>");
  res.end();
});

module.exports = router;
