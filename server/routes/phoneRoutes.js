import express from "express";
import { client, twilioPhoneNumber, authToken, accountSid } from "../config/twilioConfig.js";
import twilio from "twilio";
import https from "https";

const router = express.Router();

router.post("/call", (req, res) => {
    const { to } = req.body;
    // Original URL
    // USE NGROK URL
    const originalUrl = `https://8d85-76-78-172-33.ngrok-free.app/voice`;
    // Encode URL
    const encodedUrl = encodeURI(originalUrl);
  
    client.calls
      .create({
        to: to,
        from: twilioPhoneNumber,
        url: encodedUrl, 
      })
      .then((call) => {
        res.json({ callSid: call.sid });
      })
      .catch((error) => {
        console.error("Error initiating call:", error);
        res.status(500).json({ error: "Failed to initiate call" });
      });
  });
  
  
  router.post("/voice", (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    const from = req.body.From;
    const to = req.body.To;
    console.log("from", from);
    console.log("from", from);

    console.log("req.body", req.body);

    
    const target = req.body.To; 

    console.log("target", target);
    console.log("target", target);
    
    if (target) {
        // This is an outbound call to either a client or a phone number
        if (target.startsWith('client:')) {
            // If the target is a client, extract the client identifier
            const clientIdentifier = target.replace('client:', '');
            twiml.dial().client(clientIdentifier);
        } 
        else if (target == twilioPhoneNumber){
          console.log("Routing inbound call to desktopClient");
          twiml.dial().client('test');
        }
        else {
            twiml.dial({
              callerId: twilioPhoneNumber,
              record: 'record-from-answer', // Options: do-not-record, record-from-answer, record-from-ringing
          }, target)
            // res.type('text/xml');
            // res.send(twiml.toString());
        }
    } else {
        // For inbound calls or if no target is specified, connect to the 'test' client
        twiml.dial({
          record: 'record-from-answer'
      }).client('test');
      
    }
    
    res.type('text/xml');
    res.send(twiml.toString());
});

  router.post("/incoming", (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say("Incoming call");
    twiml.dial().client("desktopClient");
    res.type("text/xml").send(twiml.toString());
  });

  router.get('/recordings', async (req, res) => {
    try {
        const recordings = await client.recordings.list({limit: 20});
        res.json(recordings);
    } catch (error) {
        console.error("Error fetching recordings:", error);
        res.status(500).json({error: "Failed to fetch recordings"});
    }
});

router.get('/recordings/:recordingSid', async (req, res) => {
  const { recordingSid } = req.params;
  const recordingUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Recordings/${recordingSid}.mp3`;

  const auth = 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64');

  https.get(recordingUrl, {
      headers: {
          "Authorization": auth
      }
  }, (twilioRes) => {
      // Set the content type so the browser can play it directly
      res.setHeader('Content-Type', 'audio/mp3');
      twilioRes.pipe(res); // Stream the recording data from Twilio to the client
  }).on('error', (error) => {
      console.error("Error fetching recording:", error);
      res.status(500).send("Failed to fetch recording");
  });
});


export default router;
