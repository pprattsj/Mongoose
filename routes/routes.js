//Routes for Mongoose Projects
const mongoose = require('mongoose')
const url ="mongodb://localhost:27017/edx";
mongoose.connect(url)
const Account = mongoose.model('Account', 
                                  {    name: String,
                                    balance: Number})
									
//GET Account by name    
module.exports.getAcc = (req, res) =>{
   
   let username = req.query.name;
   console.log("search for " + username )
   Account.findOne({ Name: username})
    .exec(function (err, account) {
        if (err) return next(err)	
		console.log(account)	
        res.send(account);   
  })
}
//GET Accounts  
module.exports.getAccs = (req, res) =>{
	    Account.find()
    .exec(function (err, accounts) {
        if (err) return next(err)
		for (account in accounts) {console.log(accounts[account].name)}
        res.send(accounts)
  })
}

//POST new Account  +V+
module.exports.PostAcc = (req, res) =>{
	let text= req.body;
	let username = text.name
	let balance = text.balance;
	var newaccount = new Account({"name": username, "balance": balance})
	console.log( "new account: "+ newaccount)        
	newaccount.save(function (err) {
       if (err) {
          console.log(err)
       } else {
           console.log('The acct saved: ', newaccount)
       }
	res.send("new account: "+username +" / "+ balance)
    })
}

//PUT Account - update
module.exports.PutAcc = (req, res) =>{
	let text= req.body;
	let username = text.name
	let balance = text.balance;
	Account.update({"name": username},{"balance": balance}, function(err){
		if (err) return next(err)
		console.log( "reset    : "+username +" / "+ balance);
	    res.send('reset account')
    })
}

//DELETE Account by name   +V+
module.exports.DelAcc = (req, res) =>{
	let name= req.query.name;
	Account.remove( {"name": name})
    .exec(function (err, ress){
        if (err) return next(err)	
		console.log(ress)
        res.send()
    })

}