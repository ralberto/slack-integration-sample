const { WebClient } = require('@slack/web-api');
const slackToken = "xoxb-1078425763427-1090859023793-kzo5fMGqAneOM1kJfJhlQMyn";

var express = require("express");
var bodyParser = require('body-parser');
var app = express();


function setSlackHome(userId){
  // Create a new instance of the WebClient class with the token read from your environment variable
  const slack = new WebClient(slackToken);
  const currentTime = new Date().toTimeString();
  const prob = Math.floor(Math.random() * 10);

  try {
    // Use the `chat.postMessage` method to send a message from this app
    
    if(prob<5 ) {
      let result = slack.views.publish({
        user_id: userId,
        view: {
            "type": "home",
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": `*CeeCee Bass*\nProduct Manager @ ${  currentTime  }`
                },
                "accessory": {
                  "type": "image",
                  "image_url": "https://i.pinimg.com/474x/fb/b5/b6/fbb5b6798f31538f2497e7ceb2b52674.jpg",
                  "alt_text": "CeeCee Bass"
                }
              },
              {
                "type": "context",
                "elements": [
                  {
                    "type": "image",
                    "image_url": "https://www.yourccsteam.com/wp-content/uploads/2019/11/inbound.png",
                    "alt_text": "Answered"
                  },
                  {
                    "type": "plain_text",
                    "emoji": false,
                    "text": "Today 3:33 pm, 5m32s"
                  }
                ]
              },
              {
                "type": "actions",
                "elements": [
                  {
                    "type": "button",
                    "text": {
                      "type": "plain_text",
                      "text": "Call",
                      "emoji": true
                    },
                    "style": "primary",
                    "value": "approve"
                  }
                ]
              },
              {
                "type": "divider"
              }
            ]
        }
      });
    }
    else {
      result = slack.views.publish({
        user_id: userId,
        view: {
        "type": "home",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `*Active call*\n4 participants @ ${  currentTime  }`
            }
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "image",
                "image_url": "https://gfmclearcomms.co.uk/wp-content/uploads/2017/09/Outbound-Call-Handling@2x.png",
                "alt_text": "Answered"
              },
              {
                "type": "plain_text",
                "emoji": false,
                "text": "Started today, 3:33pm"
              }
            ]
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Add participant",
                  "emoji": true
                },
                "style": "primary",
                "value": "approve"
              },
                      {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Disconnect",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve"
              },
                      {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "End call",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve"
              }
            ]
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*CeeCee Bass*\nProduct Manager"
            },
            "accessory": {
              "type": "image",
              "image_url": "https://i.pinimg.com/474x/fb/b5/b6/fbb5b6798f31538f2497e7ceb2b52674.jpg",
              "alt_text": "CeeCee Bass"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Disconnect",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve"
              }
            ]
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Marti Valencia*\nStreaming Specialist"
            },
            "accessory": {
              "type": "image",
              "image_url": "https://capablefitness.files.wordpress.com/2016/01/scary-mugshot-man.jpg",
              "alt_text": "CeeCee Bass"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Disconnect",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve"
              }
            ]
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Pan He*\nBlock Kit newbie"
            },
            "accessory": {
              "type": "image",
              "image_url": "https://a.wattpad.com/cover/145435739-352-k903175.jpg",
              "alt_text": "CeeCee Bass"
            }
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Disconnect",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve"
              }
            ]
          },
          {
            "type": "divider"
          }
        ]
        }
      });
    }
    await(result);
    console.log(result);
  }
    catch (error) {
    console.error(error);
  }

};


app.use(bodyParser.json());
app.use(express.static('public'))

app.post("/slack/v1/events", function(req, res) {
  
    console.log("=========================================================");
    console.log("/slack/v1/events");
    console.log("=========================================================");
    console.log("Request: %s",req.body);
    
    res.status(200);
    
    switch (req.body.type){
      case 'url_verification':
        console.log("Event: url_verification");
        let payload = {
          "challenge": req.body.challenge
        }
        res.json(payload);
        res.status(200);
        break;
      case 'event_callback':
        console.log("Event: event_callback");
        switch(req.body.event.type){
          case 'app_home_opened':
            console.log("Event: event_callback==>app_home_opened for userId: %s",req.body.event.user);
            res.status(200);
            setSlackHome(req.body.event.user);
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

app.post("/slack/v1/actions", function(req, res) {
  console.log("**********************************************************");
  console.log("/slack/v1/actions");
  console.log("**********************************************************");
  console.log("Request: %s",req);
    
  res.status(200);
  console.log("**********************************************************");
});

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Slack Integration sample app listening at http://%s:%s", host, port);
});



/*
'{                \
              "type": "home",                 \
              "blocks": [                     \
                {\
                  "type": "section",\
                  "text": {\
                    "type": "mrkdwn",\
                    "text": "*CeeCee Bass*\nProduct Manager"\
                  },\
                  "accessory": {\
                    "type": "image",\
                    "image_url": "https://i.pinimg.com/474x/fb/b5/b6/fbb5b6798f31538f2497e7ceb2b52674.jpg",\
                    "alt_text": "CeeCee Bass"\
                  }\
                },\
                {\
                  "type": "context",\
                  "elements": [\
                    {\
                      "type": "image",\
                      "image_url": "https://www.yourccsteam.com/wp-content/uploads/2019/11/inbound.png",\
                      "alt_text": "Answered"\
                    },\
                    {\
                      "type": "plain_text",\
                      "emoji": false,\
                      "text": "Today 3:33 pm, 5m32s"\
                    }\
                  ]\
                },\
                {\
                  "type": "actions",\
                  "elements": [\
                    {\
                      "type": "button",\
                      "text": {\
                        "type": "plain_text",\
                        "text": "Call",\
                        "emoji": true\
                      },\
                      "style": "primary",\
                      "value": "approve"\
                    }\
                  ]\
                },\
                {\
                  "type": "divider"\
                },\
                {\
                  "type": "section",\
                  "text": {\
                    "type": "mrkdwn",\
                    "text": "*CeeCee Bass*\nProduct Manager"\
                  },\
                  "accessory": {\
                    "type": "image",\
                    "image_url": "https://i.pinimg.com/474x/fb/b5/b6/fbb5b6798f31538f2497e7ceb2b52674.jpg",\
                    "alt_text": "CeeCee Bass"\
                  }\
                },\
                {\
                  "type": "context",\
                  "elements": [\
                    {\
                      "type": "image",\
                      "image_url": "https://png.pngtree.com/svg/20170711/voicemail_384820.png",\
                      "alt_text": "Answered"\
                    },\
                    {\
                      "type": "plain_text",\
                      "emoji": false,\
                      "text": "Yesterday, 2m15s"\
                    }\
                  ]\
                },\
                {\
                  "type": "actions",\
                  "elements": [\
                    {\
                      "type": "button",\
                      "text": {\
                        "type": "plain_text",\
                        "text": "Call",\
                        "emoji": true\
                      },\
                      "style": "primary",\
                      "value": "approve"\
                    },\
                            {\
                      "type": "button",\
                      "text": {\
                        "type": "plain_text",\
                        "text": "View",\
                        "emoji": true\
                      },\
                      "style": "primary",\
                      "value": "approve"\
                    },\
                            {\
                      "type": "button",\
                      "text": {\
                        "type": "plain_text",\
                        "text": "Listen",\
                        "emoji": true\
                      },\
                      "style": "primary",\
                      "value": "approve"\
                    }\
                  ]\
                },\
                {\
                  "type": "divider"\
                },\
                {\
                  "type": "section",\
                  "text": {\
                    "type": "mrkdwn",\
                    "text": "*Marti Valencia*\nStreaming Specialist"\
                  },\
                  "accessory": {\
                    "type": "image",\
                    "image_url": "https://capablefitness.files.wordpress.com/2016/01/scary-mugshot-man.jpg",\
                    "alt_text": "CeeCee Bass"\
                  }\
                },\
                {\
                  "type": "context",\
                  "elements": [\
                    {\
                      "type": "image",\
                      "image_url": "https://gfmclearcomms.co.uk/wp-content/uploads/2017/09/Outbound-Call-Handling@2x.png",\
                      "alt_text": "outbound"\
                    },\
                    {\
                      "type": "plain_text",\
                      "emoji": false,\
                      "text": "Monday, 1m03s"\
                    }\
                  ]\
                },\
                {\
                  "type": "actions",\
                  "elements": [\
                    {\
                      "type": "button",\
                      "text": {\
                        "type": "plain_text",\
                        "text": "Call",\
                        "emoji": true\
                      },\
                      "style": "primary",\
                      "value": "approve"\
                    }\
                  ]\
                },\
                {\
                  "type": "divider"\
                },\
                {\
                  "type": "section",\
                  "text": {\
                    "type": "mrkdwn",\
                    "text": "*Pan He*\nBlock Kit newbie"\
                  },\
                  "accessory": {\
                    "type": "image",\
                    "image_url": "https://a.wattpad.com/cover/145435739-352-k903175.jpg",\
                    "alt_text": "CeeCee Bass"\
                  }\
                },\
                {\
                  "type": "context",\
                  "elements": [\
                    {\
                      "type": "image",\
                      "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Icons8_flat_missed_call.svg/1200px-Icons8_flat_missed_call.svg.png",\
                      "alt_text": "outbound"\
                    },\
                    {\
                      "type": "plain_text",\
                      "emoji": false,\
                      "text": "Monday, 1m03s"\
                    }\
                  ]\
                },\
                {\
                  "type": "actions",\
                  "elements": [\
                    {\
                      "type": "button",\
                      "text": {\
                        "type": "plain_text",\
                        "text": "Call",\
                        "emoji": true\
                      },\
                      "style": "primary",\
                      "value": "approve"\
                    }\
                  ]\
                },\
                {\
                  "type": "divider"\
                }\
              ]\
            }'
*/