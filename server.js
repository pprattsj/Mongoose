const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')
//const mongoose = require('mongoose')
const routes = require('./routes/routes.js')

//const url ="mongodb://localhost:27017/edx";
let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

//mongoose.connect(url, {useMongoClient: true})

//Routes
app.get('/account', (req, res) => {
	 routes.getAcc(req, res) ;
})
app.get('/accounts', (req, res) =>{
	routes.getAccs(req,res);
})
  
app.post('/account', routes.PostAcc)
  
app.put('/account', routes.PutAcc)


app.del('/account', routes.DelAcc)


//BOOTUP
  app.listen(3000)


/*
change the value of {ID} in the PUT and DELETE CURL requests to the value of the newly created account from the first POST command.

curl -H "Content-Type: application/json" -X POST -d '{"balance": 100, "name":"checking"}'  "http://localhost:3000/accounts" 
curl -H 'Content-Type: application/json' -X PUT -d '{"balance": 200, "name": "savings"}'  "http://localhost:3000/accounts/{ID}" 
curl "http://localhost:3000/accounts" 
curl -X DELETE "http://localhost:3000/accounts/{ID}" 

*/