const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5')
var AWS = require("aws-sdk")
const fileUpload = require('express-fileupload')
const app = express()
app.use(fileUpload())
const stripeSecretKey = "sk_test_51IPVGeE1OhnzAuXA6O5DHCEnFoFn83P8Bm9IqUDf7uHctArxPDKPDBPU0UggytN4jWrxgr70KcXr5hzbUpMURyv9006YzplFOn" 
const stripe = require ('stripe')(stripeSecretKey)

let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAQM45PICZCJUQDBU2",
    "secretAccessKey": "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"
}

AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
});

app.use(bodyParser.json({limit: '100GB'}));
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/register', async function(req, res) {
    console.log('here');
    var input = {
        "username": req.body.username,
        "password": md5(req.body.password),
        "images": []
    }
    var params = {
        TableName: "Users",
        Item: input
    }

    await docClient.put(params, function(err, data) {
        if (err) res.json({'status': 'invalid'});
        else res.json({'status': 'registered'});
    })
})

app.post('/api/login', async function(req, res) {
    var params = {
        TableName: "Users",
        Key: {
            "username": req.body.username,            
        }
    }
    await docClient.get(params, function(err, data){
        if (err) console.log(err);
        else {
            res.json({'userObj': data})
        }
    }) 
})

app.post('/api/upload', function(req, res) {
    console.log(req.body);
})

app.post('/api/purchase', async function(req, res){
    base_price = req.body.obj.price
    username = req.body.obj.username
    try {
        const customer = await stripe.customers.create({
            email: req.body.token.email,
            source: req.body.token.source
        })
        const charge = await stripe.charges.create({
            amount: base_price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: req.body.token.email,
            description: "Purchased image with id " + (price / 1.5),
            shipping: {
                name: req.body.token.card.name,
                address: {
                    line1: req.body.token.card.address_line1,
                    line2: req.body.token.card.address_line2,
                    city: req.body.token.card.address_city,
                    country: req.body.token.card.address_country,
                    postal_code: req.body.token.card.address_zip
                }
            }
        }, function(err, success) {
            if (err) console.log(err);
            else {
                var params = {
                    TableName: "Users",
                    Key: {
                        "username": username,            
                    }
                }
                docClient.update(params, function(err, data){
                    if (err) console.log(err);
                    else {
                        data.Item.images.push(price)
                    }
                }) 
            }
        }
        )} catch(err) {
            console.log("here");
            res.json({"status": "invaliderror"})
        }

    
        }) 

app.listen(4000, function() {
    console.log("server running on 4000");
})