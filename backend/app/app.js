//This is app.tsx where all of the libraries are imported.

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import cookieParse from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as passportLocal from '../auth/passport-local-strategy.js';
import passportJwt from '../auth/passport-jwt-strategy.js';
import passportGoogle from '../auth/passport-google-oauth2-strategy.js';
import registerRoutes from './routes/index.js';
import connectMongo from 'connect-mongodb-session';
const MongoStore = connectMongo(session);

// const oauthDetails = [{
//   "consumerKey":"ZBnetoZkRyjuJ97FSHiOmNAX6Lc4xIVrCwFkeZ7G",
//   "consumerSecret":"dmjNg944GUJ3Y3VRthSa9lJ0wkxcOony9f8G8O8U",
//   "apiKey":"iXImDYyUdvdr938XlGs63eLc0XswsL3Sqal3i9zL",
//   "tokenUrl":"https://secure.splitwise.com/oauth/token",
//   "authorizeUrl":"https://secure.splitwise.com/oauth/authorize"
// }];

const initialize = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParse());
  // TODO: MongoDB connection
  mongoose.connect('mongodb+srv://vijayvargiyam:neu!121510Boston@info-6150-mananv.64mywo5.mongodb.net/centWise-pre?retryWrites=true&w=majority'); //MongoDB connection
  const db = mongoose.connection;  

  //Session creation
  app.use(session({
    name: 'CentWise',
    secret: 'a8f3091c7baba4f391e76d36b90fd0df69086efc60b6c568dcb27b1aae6f0547',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
     store: new MongoStore({
    uri: 'mongodb+srv://vijayvargiyam:neu!121510Boston@info-6150-mananv.64mywo5.mongodb.net/centWise-pre?retryWrites=true&w=majority',
    collection: 'sessions'
  })
})); 

//passport and session initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocal.setAuthenticatedUser);
app.use(flash());
registerRoutes(app);


};

export default initialize;