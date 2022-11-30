import express from "express";
import passport from "passport";
import { UserModel } from "../../database/allModels";
import { ValidateLogin, ValidateRegister } from "../../Validation/auth.Validation";


const Router = express.Router();

/*
*Route    /register
*Desc     Register/create a user 
*Params   none
*Method   POST
*Access   Public
*/
Router.post("/register", async (req, res) => {

    try {
        await ValidateRegister(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})


/*
*Route    /login
*Desc     login a existing user and create a token
*Params   none
*Method   POST
*Access   Public
*/
Router.post("/login", async (req, res) => {
    try {
        await ValidateLogin(req.body.credentials)
        const newUser = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token, status: "success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

Router.get("/google", passport.authenticate("google",
    {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);
Router.get("/google/callback", passport.authenticate("google",
    { failureRedirect: "/" }),
    (req, res) => {
        // return res.status(200).json({
        //     token: req.session.passport.user.token,
        // });
        return res.redirect(
            `http://localhost:3000/google/${req.session.passport.user.token}`
        );
    }
);

export default Router;