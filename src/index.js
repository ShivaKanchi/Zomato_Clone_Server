import express from 'express';
import passport from 'passport';
import session from "express-session";
import cors from 'cors';
import helmet from 'helmet';
//private route authorization config
import privateRouteConfig from "./Config/route.config";
import googleAuthConfig from './Config/google.config';
//env
import dotenv from 'dotenv';
dotenv.config();
//DB Connection
import dbconnection from './database/dbconnection';
//Route
import Auth from './Api/Auth'
import Food from './Api/Food'
import User from './Api/User'
import Menu from './Api/Menu'
import Image from './Api/Image'
import Review from './Api/Review'
import Order from './Api/Order'
import Restaurant from './Api/Restaurant'

//private route authorization additional config
privateRouteConfig(passport);
googleAuthConfig(passport);
const zomato = express(); //like app  

zomato.use(cors());
zomato.use(helmet());
zomato.use(express.json());
zomato.use(session({ secret: process.env.JWTSECRET }));
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
    res.json({
        message: "Server is up"
    });
});
//auth/register
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restaurant", Restaurant);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);
const port = process.env.PORT || 4000
zomato.listen(port, () => {
    console.log("Server is up"); //port 4000
    dbconnection()
        .then(() => {
            console.log("DB connected");
        })
        .catch((error) => {
            console.log("Server up but db connection failed");
            console.log(error);
        })
});