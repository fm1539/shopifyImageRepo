const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const URI = "mongodb+srv://farhan:VD1p4AJa3yvuwVto@cluster0.tm4ga.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = async() => {
    await mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true})
    console.log("db connected!")
}

connectDB()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/register', function(req, res) {

})

app.get('/api/login', function(req, res) {

})

app.listen(8000, function() {
    console.log("server running on 3000");
})