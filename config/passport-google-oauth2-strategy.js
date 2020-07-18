const passport =require('passport');
const googleStrategy =require('passport-google-oauth').OAuth2Strategy;
const crypto =require('crypto');
const User =require('../models/user');

//tell passport to use a new Strategy for google
passport.use(new googleStrategy({
    clientID:'1050854717746-sd4usue9f38ghuf4t5vf4t054kp4b05o.apps.googleusercontent.com',
    clientSecret:'XO9RuFO_xKK22XbR0b4So9MV',
    callbackURL:'http://localhost:8000/users/auth/google/callback',
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google Strategy passport',err);
                return;
            }
            console.log(profile);
            if(user){
                //if found set this user as req.user
                return(null,user);
            }else{
                //if not found create the user and set as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating user google Strategy passport',err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports =passport;