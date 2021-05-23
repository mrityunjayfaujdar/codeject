const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const { connectToDB, databaseURL } = require("./config/mongoose");
const cookieParser = require("cookie-parser");

//used for session cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//used to store session details in MongoStore
const MongoStore = require("connect-mongo");
// const MongoStore = require("connect-mongo")(session); // -** Depricated Approach

//SASS - Syntactically Awesome Style Sheet -
const sassMiddleware = require("node-sass-middleware");

const PORT = process.env.PORT || 5000;

//setting up node-sass-middleware
app.use(
  sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="/css/style.css"/>
  })
);

//connect to Database
connectToDB();

//Middleware for incoming request from the client - Parsing body
app.use(express.urlencoded({ extended: false }));

//This is needed to get incoming cookies from the browser.
app.use(cookieParser());

//setting up the static assets folder.
app.use(express.static("assets"));

//Rendering Variable Layout
app.use(expressLayout);

//middleware for requrest coming from client.
app.use(express.urlencoded({ extended: false }));

//extract styles and scripts of individual pages and put it in layout.ejs
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up view engine - EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//MongoStore is used to store the session cookie in the DB
app.use(
  session({
    name: "codeject",
    // TODO - Change secret before deployment
    secret: "mohit",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: databaseURL,
        autoRemove: "disabled",
      },
      function (err) {
        if (err) {
          console.log(err || "connect-mongodb MongoStore Setup - OK");
        }
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use the router middleware - Prefer use at end
app.use("/", require("./routes"));

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  }
  console.log(`Server Running on Port ${PORT}`);
});
