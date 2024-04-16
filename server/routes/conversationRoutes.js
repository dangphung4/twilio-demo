import express from "express";
import { client, apiKey, apiSecret, accountSid, serviceSid, applicationSid} from "../config/twilioConfig.js";
import twilio from "twilio";

const router = express.Router();

router.get("/token", (req, res) => {
    const { identity } = req.query;
    if (!identity) {
      return res.status(400).json({ error: "Identity is required" });
    }
    // conversations sid CH71fbde93692540d9904fe65cf88783cb
    const accessToken = new twilio.jwt.AccessToken(
      accountSid,
      apiKey,
      apiSecret,
      { identity: identity }
    );
    accessToken.identity = identity;
    console.log(accessToken.identity);
    const chatGrant = new twilio.jwt.AccessToken.ChatGrant({
      serviceSid: serviceSid,
    });
    accessToken.addGrant(chatGrant);
    const token = accessToken.toJwt();
    console.log("success");
    res.json({ token });
  });

  //APb9b1f6be19311bfb1b06584de79139f8
  router.get("/voice-token", (req, res) => {
    const { identity } = req.query;
    if (!identity) {
      return res.status(400).json({ error: "Identity is required" });
    }
  
    const accessToken = new twilio.jwt.AccessToken(
      accountSid,
      apiKey,
      apiSecret,
      { identity: identity }
    );
  
    const voiceGrant = new twilio.jwt.AccessToken.VoiceGrant({
      outgoingApplicationSid: "APb9b1f6be19311bfb1b06584de79139f8",
      incomingAllow: true,
    });
  
    accessToken.addGrant(voiceGrant);
  
    const token = accessToken.toJwt();
    res.json({ token });
  });
  
  router.post("/add-participant", (req, res) => {
    const { conversationSid, phoneNumber } = req.body;
  
    if (conversationSid && phoneNumber) {
      client.conversations.v1
        .conversations(conversationSid)
        .participants.create({
          "messagingBinding.address": phoneNumber,
        })
        .then((participant) => {
          console.log("Participant added:", participant.sid);
  
          // Log the list of participants
          client.conversations.v1
            .conversations(conversationSid)
            .participants.list()
            .then((participants) => {
              console.log("Conversation participants:");
              participants.forEach((p) => {
                console.log(`- ${p.sid}: ${p.messagingBinding.address}`);
              });
              res.sendStatus(200);
            })
            .catch((error) => {
              console.error("Error fetching participants:", error);
              res.status(500).json({ error: "Error fetching participants" });
            });
        })
        .catch((error) => {
          console.error("Error adding participant:", error);
          res.status(500).json({ error: "Error adding participant" });
        });
    } else {
      res
        .status(400)
        .json({ error: "Conversation SID and phone number are required" });
    }
  });
  //CH71fbde93692540d9904fe65cf88783cb

// router.get("/messages", (req, res) => {
//     const { conversationSid } = req.query;
  
//     if (conversationSid) {
//       client.conversations.v1
//         .conversations(conversationSid)
//         .messages.list()
//         .then((messages) => {
//           res.json(messages);
//         })
//         .catch((error) => {
//           console.error("Error fetching messages:", error);
//           res.status(500).json({ error: "Error fetching messages" });
//         });
//     } else {
//       res.status(400).json({ error: "Conversation SID is required" });
//     }
//   });


router.get("/messages", (req, res) => {
    const { conversationSid } = req.query;
  
    if (conversationSid) {
      client.conversations.v1
        .conversations(conversationSid)
        .messages.list()
        .then((messagePage) => {
          const messages = messagePage.map((message) => ({
            sid: message.sid,
            author: message.author,
            body: message.body,
            timestamp: message.dateCreated,
          }));
          res.json({ messages });
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          res.status(500).json({ error: "Error fetching messages" });
        });
    } else {
      res.status(400).json({ error: "Conversation SID is required" });
    }
  });
  
  
  router.post("/messages", (req, res) => {
    const { conversationSid, body } = req.body;
  
    if (conversationSid && body) {
      console.log(conversationSid, body);
      console.log("success");
      client.conversations.v1
        .conversations(conversationSid)
        .messages.create({ body })
        .then((message) => {
          res.json(message);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          res.status(500).json({ error: "Error sending message" });
        });
    } else {
      res
        .status(400)
        .json({ error: "Conversation SID and message body are required" });
    }
  });
  
  router.post("/incoming-message", (req, res) => {
    const { From, Body } = req.body;
    console.log(From, "FROM");
  
    if (From && Body) {
      // Find the conversation associated with the incoming phone number
      client.conversations.v1.conversations
        .list({ participantIdentity: From })
        .then((conversations) => {
          if (conversations.length > 0) {
            const conversationSid = conversations[0].sid;
  
            // Check if the message already exists in the conversation
            client.conversations.v1
              .conversations(conversationSid)
              .messages.list()
              .then((messages) => {
                const existingMessage = messages.find(
                  (message) => message.author === From && message.body === Body
                );
  
                if (existingMessage) {
                  console.log(
                    "Incoming message already exists in conversation:",
                    existingMessage.sid
                  );
                  // res.sendStatus(200);
                } else {
                  // Create a new message in the conversation
                  client.conversations.v1
                    .conversations(conversationSid)
                    .messages.create({
                      body: Body,
                      author: From,
                    })
                    .then((message) => {
                      console.log(
                        "Incoming message added to conversation:",
                        message.sid
                      );
                      // res.sendStatus(200);
                    })
                    .catch((error) => {
                      console.error(
                        "Error adding incoming message to conversation:",
                        error
                      );
                      // res.sendStatus(500);
                    });
                }
              })
              .catch((error) => {
                console.error(
                  "Error listing messages in conversation:",
                  error
                );
                res.sendStatus(500);
              });
          } else {
            console.warn("No conversation found for incoming message");
            res.sendStatus(200);
          }
        })
        .catch((error) => {
          console.error(
            "Error finding conversation for incoming message:",
            error
          );
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(400);
    }
  });
  let conversationSid = "CHab0758fc1b774855a5fb6badba140678";

  router.get("/conversation", (req, res) => {
    if (conversationSid) {
      client.conversations.v1
        .conversations(conversationSid)
        .fetch()
        .then((conversation) => {
          res.json(conversation);
        })
        .catch((error) => {
          console.error("Error fetching conversation:", error);
          res.status(500).json({ error: "Error fetching conversation" });
        });
    } else {
      res.status(404).json({ error: "Conversation not found" });
    }
  });
  
  export default router;