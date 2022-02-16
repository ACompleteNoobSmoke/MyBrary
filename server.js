if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});

const db = mongoose.connection;

//This is in the case of an error with the connection
db.on('error', error => console.log(error));

//This is to run once we have connected to Mongoose
db.once('open', () => console.log('Connected'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);


app.listen(process.env.PORT || 3001);