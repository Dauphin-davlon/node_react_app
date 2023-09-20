const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const routesHandler = require('./routes/handler.js')
const mongoose = require('mongoose');
require('dotenv/config');



const app = express();

// Use body-parser middleware with extended option
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',routesHandler);


//connect database
mongoose.connect(process.env.DB_URI, {useNewUrlParser :true, useUnifiedTopology: true})
.then(() => {
    console.log('DB Connected')
})
.catch((err) => {
    console.log(err)
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}.`);
});

