import { useState } from "react";

function TextPage() {
  const [toNumber, setToNumber] = useState("");
  const [message, setMessage] = useState("");

  const sendText = async () => {
    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: toNumber, body: message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Message sent successfully", data.sid);
      console.log("Message:", message);
      console.log("To:", toNumber);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Send a Text</h2>
      <input
        type="text"
        value={toNumber}
        onChange={(e) => setToNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      ></textarea>
      <button onClick={sendText}>Send Text</button>
    </div>
  );
}

export default TextPage;
