# API Project: Timestamp Microservice

### User stories (WIP) :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"error" : "Invalid Date" }`. 

#### Example usage:
* https://timestamp-service-lb.glitch.me/api/timestamp/2015-12-15
* https://timestamp-service-lb.glitch.me/api/timestamp/1450137600000

#### Example output:
* {"unix": 1450137600000, "utc": "Tue, 15 Dec 2015 00:00:00 GMT"}

![screencapture-timestamp-service-lb-glitch-me-2020-04-08-20_46_57](https://user-images.githubusercontent.com/58770446/78821713-35c29f00-79da-11ea-97fd-2a3756b26c54.png)