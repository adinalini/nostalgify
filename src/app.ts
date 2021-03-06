import express from 'express'

import bodyParser from 'body-parser'

import cors from 'cors'

import passport from 'passport'

import session from 'express-session'

import database from './modules/database/connect'
/**
 * Importing all modules to application
 */
import userModule from './modules/user/routes'

/** Load environment variable simulations */
require('dotenv').config()

/** Defining configurations */
const sessionConfigurations = {
  secret: process.env.secret || 'somethingVerySecret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000, secure: false, httpOnly: false },
}

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session(sessionConfigurations))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'ejs');
database.connect()

/**
 * Attach all modules here
 */
app.use('/user', userModule)

// temporary - To be deleted in future. Just for demo purpose.
app.get('/welcome', (req,res)=> res.render('home',{name:"user123"}));

/** Handle 404  */
app.get('*', (req, res) => res.send('404'))

// pass instance
export default app
