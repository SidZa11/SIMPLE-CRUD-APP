require('dotenv').config()

const express = require('express');
const app = express();

const path = require('path');
const process = require('process');
const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const productRouter = require('./routes/product.route')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// CORS
app.use(cors());

//Route
app.use('/api/products', productRouter)

/** Replace <username> and <password> with your "username" and "password". */
mongoose.connect(process.env.ConnectionStringMongoDB)
.then(() =>{
    console.log("Connected to Server!");
    app.listen(process.env.Port,()=> {
        console.log(`server server is running on port ${process.env.Port}.`)
}
)})
.catch(console.log);
