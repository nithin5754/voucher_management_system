require('dotenv').config();
const express=require('express')
const session = require('express-session');
const path = require('path');
const nocache = require('nocache');
const { v4: uuid4 } = require('uuid');

const dbConnect=require('./database/connection')
const app = express();
const port =process.env.PORT


const userRoutes=require('./routes/user.routes')
const dashboardRoutes=require('./routes/dashboard.routes')
const settingsRoutes=require('./routes/setting.routes')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')));


/**
 * @description {Initialize session}
 */

app.use(session({
    secret: uuid4(), 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 
    }
}));

/**
 * @description {Disable caching}
 */

app.use(nocache());

app.use('/', userRoutes);
app.use('/', dashboardRoutes);
app.use('/',settingsRoutes)

dbConnect.getConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error)
});