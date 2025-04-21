require('dotenv').config();
const path = require('path');
const express = require('express');
const { env } = require('process');
const routes = require('./routes/')
const { engine } = require('express-handlebars');
const db = require('./config/db');
const morgan = require('morgan');
const methodOverride = require('method-override');
// sort midleware
const sortMidleware = require('./app/midleware/sortMidleware');
const helpers = require('./helpers/handlesbar');

const app = express();
const port = env.PORT || 3000;

// conect to database
db.connect()
// app.use(morgan('combined'));

// set json
app.use(express.json());

// post request
app.use(express.urlencoded({
    extended: true,
}));

// set static directory 
app.use(express.static(path.join(__dirname, 'public')));

// set method override (put, path,....) cause HLMT only subport method GET and POST
app.use(methodOverride('_method'))

// set engine 
app.engine('.hbs',
    engine({
        extname: '.hbs',
        helpers: helpers,

    })
);

// set veiws engine
app.set('view engine', '.hbs');

//import custom midelware
app.use(sortMidleware);

// set veiw
app.set('views', path.join(__dirname, 'resource', 'views'));

routes(app);

app.listen(port, () => console.log(`Server starting port: ${port}`));
