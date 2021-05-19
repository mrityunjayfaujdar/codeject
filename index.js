const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  console.log(`Servers Running on Port ${PORT}`);
});
