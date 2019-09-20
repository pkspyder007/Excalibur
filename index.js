//Import our dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
//Import the routes
const AuthRouter = require('./routes/auth.routes');
const UserRouter = require('./routes/user.routes');
const ProductRouter = require('./routes/product.routes');

const passport = require('passport');
const cookieSession = require('cookie-session');

require('./scraper/Amazon')
require('./scraper/Flipkart')
require('./scraper/Notify')

//Initiat the app
const app = express();

//Initiat the middlewares
app.use(express.json());
app.use(cors());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session())

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_COOKIE_KEY]
}))

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/product', ProductRouter);

//Connect to the database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-6yvlv.mongodb.net/ABES?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(info => {
    console.log('Connected to database...');
    setInterval(Amazon, 1000 * 60 * 60);
    setInterval(Flipkart, 1000 * 60 * 60);
    setInterval(Notify, 1000 * 60 * 60 * 5);
  })
  .catch(err => {
    console.log(err);
  });
mongoose.Promise = global.Promise;

//Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Up and Running...`);
});