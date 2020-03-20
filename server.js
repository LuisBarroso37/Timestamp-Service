// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

// Timestamp service
app.get("/api/timestamp/:dateString?", (req, res) => { //:dateString? - The ? means that the request parameter is optional - allows the case that no date is input
  let dateString = req.params.dateString;
  let date;
  
  if (dateString == null) {
    //If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp
    date = new Date();
  } else {
    if (isNaN(dateString)) { // if the date string is a string, then we just use the regular Date function
      date = new Date(dateString);
    } else { // if the date string is given as an unix (date should be an integer in this case) then we use the parseInt function to turn the string into an integer
      date = new Date(parseInt(dateString));
    }
  };

  if (date == "Invalid Date") {
    //If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }. 
    res.json({"error": "Invalid Date"});
  } else {
    //If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  }
});


// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;