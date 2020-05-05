const slackToken        = process.env.SLACK_BOT_TOKEN;
const slackSignSecret   = process.env.SLACK_SIGNING_SECRET;
const { App }           = require('@slack/bolt');

const app = new App({
  token: slackToken,
  signingSecret: slackSignSecret
});


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

(async () => {
    // Start your app
    await app.start(process.env.PORT || 8080);
  
    console.log('⚡️ Slack Integration Bolt Test App is up & running!');
  })();

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    
  console.log("=========================================================");
  console.log("Received Hello Message: %s", message);
  console.log("=========================================================");
  
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `Hey there <@${message.user}>!`
      },
      "accessory": {
        "type": "button",
        "text": {
          "type": "plain_text",
          "text": "Click Me"
        },
        "action_id": "button_click"
      }
    }
    ]
  });
});

app.event('app_home_opened',async ({ event, context }) => {
  
  console.log("=========================================================");
  console.log("Event: App Home Opened - %s", event);
  console.log("=========================================================");
  setSlackHome(event,context);
});


app.action('button_click', async ({ body, ack, say }) => {
  console.log("=========================================================");
  console.log("Clicked button");
  console.log("=========================================================");
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

app.action('call', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  
  console.log("=========================================================");
  console.log("Clicked Call button");
  console.log("Body: %s", body);
  console.log("Actions: %s", body.actions.value);
  console.log("=========================================================");
  
  
  //await say(`<@${body.user.id}> clicked the Call %s button`, body.value);
});

app.action('disconnect', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  
  console.log("=========================================================");
  console.log("Clicked Disconnect button");
  console.log("Body: %s", body);
  console.log("Actions: %s", body.actions.value);
  console.log("=========================================================");
  
  
  //await say(`<@${body.user.id}> clicked the Call %s button`, body.value);
});

app.action('add_participant', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  
  console.log("=========================================================");
  console.log("Clicked Add Participant button");
  console.log("Body: %s", body);
  console.log("Actions: %s", body.actions.value);
  console.log("=========================================================");
  
  
  //await say(`<@${body.user.id}> clicked the Call %s button`, body.value);
});

app.action('end_call', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  
  console.log("=========================================================");
  console.log("Clicked Call button");
  console.log("Body: %s", body);
  console.log("Actions: %s", body.actions.value);
  console.log("=========================================================");
  
  
  //await say(`<@${body.user.id}> clicked the Call %s button`, body.value);
});


async function setSlackHome(event,context){
  // Create a new instance of the WebClient class with the token read from your environment variable
  const currentTime = new Date().toTimeString();
  const prob = Math.floor(Math.random() * 10);

  try {
    // Use the `chat.postMessage` method to send a message from this app
    
    if(prob<5 ) {
      let result = await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
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
                    "value": "CeeCee Bass",
                    "action_id": "call"
                  }
                ]
              },
              {
                "type": "divider"
              }
            ]
        }
      });
      
      console.log("Result: %s",result);
    }
    else {
      let result = await app.client.views.publish({
        token: context.botToken,
        user_id: event.user,
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
                "value": "approve",
                "action_id": "add_participant"
              },
                      {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Disconnect",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve",
                "action_id": "disconnect"
                
              },
                      {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "End call",
                  "emoji": true
                },
                "style": "danger",
                "value": "approve",
                "action_id": "end_call"
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
                "value": "CeeCee Bass",
                "action_id": "disconnect"
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
                "value": "Marti Valencia",
                "action_id": "disconnect"
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
                "value": "Pan He",
                "action_id": "disconnect"
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
    
  }
    catch (error) {
    console.error(error);
  }
};
