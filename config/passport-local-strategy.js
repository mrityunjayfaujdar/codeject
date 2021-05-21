const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

//authentication usign passport - Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user and establish the identity
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("Error in Finding user --> Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        //if user found
        return done(null, user);
      });
    }
  )
);

//serialize the user to decide which key is to be kept in the cookies
// this will serialize and send the key to browser.
passport.serializeUser(function (user, done) {
  done(null, user._id); // automatically encrypts the ID in the cookie
});

//deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in Finding user --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //If the user is signed In, pass the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie
    //we are sending this to locals for views
    //this will be directly accessible in views.
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
