var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(username,password,done) {
        var user = {name: "HW3User"};
        if(username == user.name && password == "CelticFarmer")
        {
            return done(null, user);
        }
        else
        {
            return done(null, false);
        }
    }
));

exports.isAuthenticated = passport.authenticate('basic', {session : false});