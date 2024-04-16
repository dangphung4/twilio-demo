import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MessagesPage.css";

const MessagesPage = () => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get("/api/conversation");
        setConversation(response.data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
        setError("Failed to fetch conversation. Please try again.");
      }
    };

    fetchConversation();
  }, []);

  useEffect(() => {
    // Fetch messages periodically
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages?conversationSid=${conversation.sid}`);
        setMessages(response.data.messages || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages. Please try again.");
      }
    };

    if (conversation) {
      const intervalId = setInterval(fetchMessages, 5000); // Fetch messages every 5 seconds
      fetchMessages(); // Fetch messages initially

      return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      };
    }
  }, [conversation]);

  const sendMessage = async () => {
    try {
      await axios.post("/api/messages", {
        conversationSid: conversation.sid,
        body: newMessage,
      });
      console.log("success", newMessage);
      
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="messages-page">
      <h1>Conversation</h1>
      {conversation ? (
        <div>
          <p>Conversation SID: {conversation.sid}</p>
          <p>Friendly Name: {conversation.friendlyName}</p>
        </div>
      ) : (
        <p>Loading conversation...</p>
      )}

      <h2>Messages</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="message-list">
        {messages &&
          messages.map((message) => (
            <div
              key={message.sid}
              className={`message ${
                message.author === "+17032233922" ? "twilio" : "personal"
              }`}
            >
              <p className="message-body">{message.body}</p>
              <p className="message-body">{message.author === "+17032233922" ? " From Dang" : " From Twilio Support"}</p>
              

            </div>
          ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagesPage;