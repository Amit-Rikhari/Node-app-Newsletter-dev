const express = require("express");
const bodyParser = require("body-parser");
//const port = 8080;

const https= require("https");

const app=express();
app.use(express.static("public"));



app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){

res.sendFile(__dirname+"/signup.html")
});



app.post("/",function(req,res){

const firstname = req.body.name;
const lastname = req.body.lname;
const emailadd = req.body.email;

var data = {
	
	members: [{
		email_address:emailadd,
		status:"subscribed",
		merge_fields:{
			FNAME:firstname,
			LNAME:lastname
			
		}
		
	}]
};

const jsondata = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/b15d8ab8f0";


const options ={
 method : "POST",
 auth:"techyink:b457f2987d1d6bc106e9dd12ffb44935-us21"
 
	
}

const request=https.request(url, options, function(response){
	if (response.statusCode === 200){
	res.sendFile(__dirname+"/success.html");}
		else{
			res.sendFile(__dirname+"/failure.html");
		}
	
	
	
	response.on("data", function(data){
		console.log(JSON.parse(data));
	})

})
request.write(jsondata);
request.end();
});


app.post("/failure",function(req, res){
	
	res.redirect("/");
})




 app.listen( 9982, function(){

console.log("Server is up at  9982 ");
});
