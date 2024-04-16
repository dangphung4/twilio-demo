import React, { useState, useEffect } from "react";
import { Device } from "@twilio/voice-sdk";

const CallPage = () => {
  const [device, setDevice] = useState(null);
  const [callStatus, setCallStatus] = useState("Disconnected");
  const [identity, setIdentity] = useState("test"); // This should be the same as the client name in the server
  const [callTo, setCallTo] = useState("1234567890");

  useEffect(() => {
    fetch(`api/voice-token?identity=${identity}`)
      .then((res) => res.json())
      .then((data) => {
        const newDevice = new Device(data.token, { debug: true });
        newDevice.register();

        console.log(newDevice);

        setDevice(newDevice);
      })
      .catch((error) => console.error("Error fetching Twilio token:", error));
  }, [identity]);

  if (device !== null) {
    device.on("connect", () => {
      setCallStatus("Connected");
    });
    device.on("disconnect", () => {
      setCallStatus("Disconnected");
    });
    device.on("incoming", (call) => {
      console.log("Incoming call from", call.parameters.From);
      call.accept();
    });
  }
  const makeCall = () => {
    if (device) {
      setCallStatus("Calling...");
      device.connect({ params: { To: callTo } });
    }
  };

  const hangUp = () => {
    if (device) {
      device.disconnectAll();
    }
  };

  return (
    <div>
      <h2>Call Page</h2>
      <p>Status: {callStatus}</p>
      <input
        type="text"
        value={callTo}
        onChange={(e) => setCallTo(e.target.value)}
        placeholder="Enter number or client to call"
      />
      <button onClick={makeCall}>Call</button>
      <button onClick={hangUp}>Hang Up</button>
    </div>
  );
};

export default CallPage;
