import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";

const localStrategy = Strategy;

export const PassportStrategy = (passport) => {
    passport.use(
        "login",
        new localStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                let user = await UserModel.findOne({ email: email });
                let passwordValid =
                    user && bcrypt.compareSync(password, user.password);

                // If password valid call done and serialize user.id to req.user property
                if (passwordValid) {
                    return done(null, {
                        id: user.id,
                    });
                }
                // If invalid call done with false and flash message
                return done(null, false, {
                    message: "Invalid email and/or password",
                });
            }
        )
    );
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        UserModel.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        });
    });
};
