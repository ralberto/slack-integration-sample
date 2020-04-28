var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());
app.use(express.static('public'))

app.post("/slack/v1/events", function(req, res) {
    res.status(200);
    var payload = {
        "challenge": req.body.body.challenge
    }
    res.json(payload)
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Slack Integration sample app listening at http://%s:%s", host, port);
});