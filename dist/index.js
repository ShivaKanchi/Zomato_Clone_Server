"use strict";

var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _route = _interopRequireDefault(require("./Config/route.config"));
var _google = _interopRequireDefault(require("./Config/google.config"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _dbconnection = _interopRequireDefault(require("./database/dbconnection"));
var _Auth = _interopRequireDefault(require("./Api/Auth"));
var _Food = _interopRequireDefault(require("./Api/Food"));
var _User = _interopRequireDefault(require("./Api/User"));
var _Menu = _interopRequireDefault(require("./Api/Menu"));
var _Image = _interopRequireDefault(require("./Api/Image"));
var _Review = _interopRequireDefault(require("./Api/Review"));
var _Order = _interopRequireDefault(require("./Api/Order"));
var _Restaurant = _interopRequireDefault(require("./Api/Restaurant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//private route authorization config

//env

_dotenv.default.config();
//DB Connection

//private route authorization additional config
(0, _route.default)(_passport.default);
(0, _google.default)(_passport.default);
const zomato = (0, _express.default)(); //like app  

zomato.use((0, _cors.default)({
  origin: "http://localhost:3000"
}));
zomato.use((0, _helmet.default)());
zomato.use(_express.default.json());
zomato.use((0, _expressSession.default)({
  secret: process.env.JWTSECRET
}));
zomato.use(_passport.default.initialize());
zomato.use(_passport.default.session());
zomato.get("/", (req, res) => {
  res.json({
    message: "Server is up"
  });
});
//auth/register
zomato.use("/auth", _Auth.default);
zomato.use("/food", _Food.default);
zomato.use("/restaurant", _Restaurant.default);
zomato.use("/user", _User.default);
zomato.use("/menu", _Menu.default);
zomato.use("/image", _Image.default);
zomato.use("/order", _Order.default);
zomato.use("/review", _Review.default);
const port = process.env.PORT || 4000;
zomato.listen(port, () => {
  console.log("Server is up"); //port 4000
  (0, _dbconnection.default)().then(() => {
    console.log("DB connected");
  }).catch(error => {
    console.log("Server up but db connection failed");
    console.log(error);
  });
});