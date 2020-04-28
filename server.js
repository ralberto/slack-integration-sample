var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

app.post("/slack/v1/events", function(req, res) {
  
    res.status(200);
    var payload = {
        "challenge": req.body.body.challenge
    }
    res.json(payload)
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Slack Integration sample app listening at http://%s:%s", host, port);
});