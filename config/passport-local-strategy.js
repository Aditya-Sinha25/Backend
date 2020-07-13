const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const User= require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish an identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding the user');
                return done(err);
            }
            if(!user||user.password!=password){
                console.log('Inavalid User');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

//serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user");
            return done(err);
        }
        return done(null,user);
    });
});

module.exports =passport;