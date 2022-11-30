import googleOAuth from "passport-google-oauth2";
import { UserModel } from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:4000/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    fullname: profile.displayName,
                    email: profile.emails[0].value,//primary email
                    profilePic: profile.photos[0].value,//profile pic
                };
                try {
                    const user = await UserModel.findOne({ email: newUser.email }); //does user already exits
                    if (user) {
                        const token = user.generateJwtToken();
                        done(null, { user, token });
                    } else {
                        const user = await UserModel.create(newUser);
                        const token = user.generateJwtToken();
                        done(null, { user, token });
                    }
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );
    passport.serializeUser((userData, done) => done(null, { ...userData })); //serialize the data to proper format
    passport.deserializeUser((id, done) => done(null, id));
};