const express = require("express");
const app = express();

//use the router middleware
app.use("/", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  console.log(`Server Running on Port ${PORT}`);
});
