import express from "express";
import { client, twilioPhoneNumber } from "../config/twilioConfig.js";

const router = express.Router();

router.post("/make-call", (req, res) => {
    const { to } = req.body;
    client.calls
      .create({
        url: "http://demo.twilio.com/docs/voice.xml",
        to: to,
        from: twilioPhoneNumber, // Twilio # , demo test- you jus get rick rolled
      })
      .then((call) => res.json({ sid: call.sid }))
      .catch((err) => res.status(500).json({ error: err.message }));
  });
  
  // Endpoint to send an SMS
  router.post("/send-sms", async (req, res) => {
    try {
      const { to, body } = req.body;
      const message = await client.messages.create({
        to: to,
        from: twilioPhoneNumber, // TWilio phone number
        body: body,
      });
      res.json({ sid: message.sid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const messages = [];
  
  // Endpoint to receive SMS messages
  router.post("/receive-sms", (req, res) => {
    const { Body, From } = req.body; // Twilio sends you the message body and sender number
    console.log(`Message received from ${From}: ${Body}`);
  
    messages.push({ from: From, body: Body, receivedAt: new Date() });
  
    res.send(
      `<Response>Thank you for reaching out to our support team. Someone will contact you shortly!</Response>`
    ); // Sending an empty TwiML response
  });
  

  export default router;