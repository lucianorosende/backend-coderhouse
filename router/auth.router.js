import Express from "express";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const authRouter = Express.Router();

authRouter.get("/session", (req, res) => {
    res.json({ success: req.user });
});
authRouter.get("/logout", (req, res) => {
    res.json({ success: req.user });
});

authRouter.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json({ error: "user doesn't exist" });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.json({ success: "logged in" });
            });
        }
    })(req, res);
});
authRouter.post("/register", (req, res) => {
    UserModel.findOne({ email: req.body.email }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("user exists");
        if (!doc) {
            const pwHash = await bcrypt.hash(req.body.password, 10);
            await UserModel.create({
                email: req.body.email,
                password: pwHash,
            });
            res.send("user created");
        }
    });
});
