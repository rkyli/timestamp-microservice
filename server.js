// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  console.log("hello");
  res.json({greeting: 'hello API'});
});

//Project starts here
app.get("/api/timestamp/:date_string?",function(req,res){
const {date_string} = req.params;
console.log("input from URL:" + date_string);
var input = date_string;
if(input === ""){
  input = new Date();
}else{
  input = new Date(date_string);
}


if(moment(input,"YYYY-MM-DD").isValid()){
  console.log("date valid");
  res.json({"unix" : input.getTime(), "utc": input.toUTCString()});
} 
//console.log("moment check time (input): " + moment(input,"X"));
else if(moment(parseInt(date_string),"X").isValid() && !date_string.includes("-")){
  console.log("unix valid");
  res.json({"unix":date_string, "utc":new Date().toUTCString() });

}else{

 
  res.json({"error":"Invalid Date"});
}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});