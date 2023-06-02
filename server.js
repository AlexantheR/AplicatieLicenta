const express = require('express');
const db = require('./db');
const app = express();
const Pizza = require('./models/pizzaModel');
const Drink = require('./models/drinksModel');
const pizzasRoute = require('./routes/pizzasRoute');
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')
const drinksRoute = require('./routes/drinksRoute')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/availability', require('./routes/availabilityRoute'));
app.use('/reservation', require('./routes/reservationRoute'));
app.use('/api/pizzas/', pizzasRoute);
app.use('/api/users/', userRoute);
app.use('/api/orders/', ordersRoute);
app.use('/api/drinks/', drinksRoute);

app.get("/", (req, res) => {
    res.send("Server working" + port);
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    `Server running on port port`;
})