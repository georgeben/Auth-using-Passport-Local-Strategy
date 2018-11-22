const http = require('http'),
      express = require('express'),
      logger = require('morgan'),
      exphbs = require('express-handlebars'),
      bodyParser = require('body-parser'),
      path = require('path'),
      passport = require('passport'),
      Strategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt'),
      expressSession = require('express-session'),
      dashboard = require('./routes/dashboard'),
      flash = require('connect-flash'),
      cookieParser = require('cookie-parser'),
      mongoose = require('mongoose');

const index = require('./routes/index'),
      register = require('./routes/register');

const User = mongoose.model('Users');

passport.use(new Strategy(
    function(username, password, cb) {
        User.findOne({username:username}, (err, user) =>{
            if(err){
                console.log("Error looking up db");
                return cb(err)
            }

            if(!user){
                return cb(null, false)
            }

            bcrypt.compare(password, user.password, (err, match) =>{
                if(err){
                    console.log("Error while comparing password");
                    return cb(err);
                }

                if(match){
                    console.log("Correct details");
                    return cb(null, user)
                }else{
                    return cb(null, false)
                }
            })
        })
    }));

passport.serializeUser((user, cb) =>{
    cb(null, user._id);
});

passport.deserializeUser((id, cb) =>{
    User.findById(id, (err, user) =>{
        return cb(err, user)
    })
})

const  app = express();

mongoose.connect("mongodb://localhost:27017/passport");
mongoose.Promise = global.Promise;
const dbConnection = mongoose.connection;

dbConnection.on('connected', () => console.log("Successfully connected to db"));
dbConnection.on('error', () => console.log("Failed to connec to db", err));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(expressSession({secret: 'georgeben', resave: false, saveUninitialized: false}))
app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.resolve(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout:'main'}));
app.set("view engine", "handlebars");

app.use(express.static(path.resolve(__dirname, "public")));


app.use('/', index);

app.use('/register', register);

app.use(dashboard)

const server = app.listen(8081, () =>console.log(`Server started on port 3000`));
