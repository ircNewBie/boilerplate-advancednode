'use strict';
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const express = require('express');
const pug = require('pug');
const myDB = require('./connection');
const ObjectId = require('mongodb').ObjectId;
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();
app.set('view engine', 'pug');


fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  // secret: 'sample.env.SESSION_SECRET',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  myDataBase.findOne({_id: new ObjectId(id)}, (err, doc) => {
    done (null, null);
  });
});


app.route('/').get((req, res) => {
  res.render(`${process.cwd()}/views/pug`,
    {
      title: 'Hello',
      message: 'Please login'
    });
});

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
