const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 5000;

//setting up the static assets folder.
app.use(express.static("assets"));

//Rendering Variable Layout
app.use(expressLayout);

//setting up view engine - EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//middleware for requrest coming from client.
app.use(express.urlencoded({ extended: false }));

//use the router middleware
app.use("/", require("./routes"));

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  console.log(`Server Running on Port ${PORT}`);
});
