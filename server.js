const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser')
const config = require('./models/db');
const PORT = 4000;
const client = mongodb.MongoClient;
require('./models/user');
require('./config/passport');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));


client.connect(config.DB, function(err, db) {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
    }
});

app.get('/', function(req, res) {
    res.json({"hello": "world"});
});


 
app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
