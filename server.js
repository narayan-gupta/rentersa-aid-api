const express = require('express');
const app = express();
const mongodb = require('mongodb');

const config = require('./models/db');
const PORT = 4000;
const client = mongodb.MongoClient;
require('./models/Users');
require('./config/passport');

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

app.post()
app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
