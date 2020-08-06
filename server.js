const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const multer = require('multer')
const upload = multer({dest: 'dest.uploads'});
const initialize = require('./demo/initialize');
const port = process.env.PORT || 3000;

// We'll need to load the env vars
require('dotenv').config()

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');

//Setup our routes
// require our routes
const indexRoutes = require('./routes/index');
const membersRoutes = require('./routes/members');
const artistsRoutes = require('./routes/artists');
const worksRoutes = require('./routes/works');
const profilesRoutes = require('./routes/profiles');
const adminRoutes = require('./routes/admin');

const passport = require('passport');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// TODO Add session middleware here
app.use(session({
  secret: 'PaintForDubloons!',
  resave: false,
  saveUninitialized: true
}));

// app.use(initialize.init)

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res, next) {
  res.locals.user = req.user;
  next();
})


app.use('/', indexRoutes);
app.use('/', membersRoutes);
app.use('/', artistsRoutes);
app.use('/', worksRoutes);
app.use('/', adminRoutes);
app.use('/', profilesRoutes);



initialize.init(console.log);
app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
  });