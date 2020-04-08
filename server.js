// init project
const express = require('express');
const app = express();

// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// Enables style.css file
app.use(express.static('public'));

// Loads index.html file when you enter app
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//User story 1 - The API endpoint is GET [project_url]/api/timestamp/:date_string?
app.get("/api/timestamp/:dateString?", (req, res) => { //:dateString? - The ? means that the request parameter is optional - allows the case that no date is input
  let dateString = req.params.dateString;
  let date;
  
  //User story 2 - A date string is valid if can be successfully parsed by new Date(date_string).
  //Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds.
  //In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.
  if (dateString == null) {
    date = new Date(); //User story 3 - If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
  } else {
    if (isNaN(dateString)) { // if the date string is a string, then we just use the regular Date function
      date = new Date(dateString);
    } else { // if the date string is given as an unix (date should be an integer in this case) then we use the parseInt function to turn the string into an integer
      date = new Date(parseInt(dateString));
    }
  };

  if (date == "Invalid Date") {
    res.json({"error": "Invalid Date"}); //User story 5 - If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }
  } else {
    //User story 4 - If the date string is valid the api returns a JSON having the structure
    //{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    //e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  }
});

// listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;