const express = require("express");
const app = express();

global.__root = __dirname;

const dotenv = require('dotenv').config();

//Sequelize database synchronization
const db = require("./models");
(async () => {
  await db.sequelize.sync();
})();

//Create folder architecture if don't exist
const storage = require('./config/storage');
storage.createAssetsPicturesStorage();

//Static files
app.use(express.static('./assets'));


app.set('view engine', 'ejs');

//Cookie Parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//Body Parser
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));
//Session
const sessions = require('./config/sessions');
app.use(sessions);

//Passport
const passport = require('./config/passport');
//Passport Initialize
app.use(passport.initialize());
//Passport session
app.use(passport.session());

//Cors
const corsWithOptions = require("./config/cors");
app.use(corsWithOptions);

//Router
const indexRouter = require("./routers/index");
app.use("/", indexRouter);

app.listen(process.env.PORT || "8080", () => {
  console.log(`Le serveur est à l’écoute sur le port ${process.env.PORT}`);
});
