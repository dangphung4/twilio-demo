import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import twilioRoutes from "./routes/twilioRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import phoneRoutes from "./routes/phoneRoutes.js";
import { client, yourPhoneNumber, twilioPhoneNumber } from "./config/twilioConfig.js";

const app = express();
app.use(cors());
const port = 3001; // dif port than the react app
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});



app.use("/", twilioRoutes);
app.use("/", conversationRoutes);
app.use("/", phoneRoutes);


app.post("/add-participant", (req, res) => {
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

let conversationSid = "CHab0758fc1b774855a5fb6badba140678";
client.conversations.v1.conversations("CHab0758fc1b774855a5fb6badba140678")
  .participants.list()
  .then((participants) => {
    console.log("Conversation Participants:");
    let isPhoneNumberAssociated = false;

    participants.forEach((participant) => {
      console.log(`- ${participant.sid}: ${participant.messagingBinding.address}`);

      if (participant.messagingBinding.address === yourPhoneNumber) {
        isPhoneNumberAssociated = true;
      }
    });

    if (isPhoneNumberAssociated) {
      console.log("Your phone number is associated with the conversation.");
    } else {
      console.log("Your phone number is not associated with the conversation.");
    }
  })
  .catch((error) => {
    console.error("Error fetching conversation participants:", error);
  });

// client.conversations.v1.conversations("CHab0758fc1b774855a5fb6badba140678")
// .participants.create({
//   'messagingBinding.address': yourPhoneNumber,
// })
// .then((participant) => {
//   console.log("Participant added:", participant.sid);
//   console.log("Phone number:", participant.messagingBinding.address);
// })
// .catch((error) => {
//   console.error("Error adding participant:", error);
// });

// client.conversations.v1.conversations("CHab0758fc1b774855a5fb6badba140678")
//   .participants.create({
//     'messagingBinding.address': twilioPhoneNumber,
//   })
//   .then((participant) => {
//     console.log("Participant added:", participant.sid);
//     console.log("Phone number:", participant.messagingBinding.address);
//   })
//   .catch((error) => {
//     console.error("Error adding participant:", error);
//   });


// client.conversations.conversations
//   .create({
//     friendlyName: "Conversation with your phone",
//   })
//   .then((conversation) => {
//     console.log("Conversation created:", conversation.sid);
//     conversationSid = conversation.sid;

//     return client.conversations
//       .conversations(conversation.sid)
//       .participants.create({
//         "messagingBinding.address": yourPhoneNumber,
//         "messagingBinding.proxyAddress": twilioPhoneNumber,
//       });
//   })
//   .then((participant) => {
//     console.log("Participant added:", participant.sid);

//     // Send a message to the conversation
//     return client.conversations.v1
//       .conversations(participant.conversationSid)
//       .messages.create({
//         author: "Browser", // Use the same identity as the participant
//         body: "Hello from Twilio!",
//       });
//   })
//   .then((message) => {
//     console.log("Message sent:", message.sid);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

app.get("/conversation", (req, res) => {
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



app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
