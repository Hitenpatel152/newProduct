const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());


require('./database/db');


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));


app.use('/controller/productController/images', express.static(path.join(__dirname, 'controller/productController/images')));

const UserRoute = require('./routes/UserRoute/user');

//routes...
app.use('/', UserRoute);

app.listen(process.env.PORT, () => {
    console.log(`server run on ${process.env.PORT}`);
});

