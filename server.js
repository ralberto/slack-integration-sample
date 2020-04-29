var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

app.post("/slack/v1/events", function(req, res) {
  
    console.log("=========================================================");
    console.log("Request: %s",req.body);
    
    res.status(200);
    
    switch (req.body.type){
      case 'url_verification':
        console.log("Event: url_verification");
        var payload = {
          "challenge": req.body.challenge
        }
        res.json(payload);
        res.status(200);
        break;
      case 'event_callback':
        console.log("Event: event_callback");
        switch(req.body.event.type){
          case 'app_home_opened':
            console.log("Event: event_callback==>app_home_opened");
            res.status(200);
            break;
          default:
            res.status(400);
        }
        break;
      default:
        res.status(400);
    } 

    console.log("=========================================================");
    
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Slack Integration sample app listening at http://%s:%s", host, port);
});