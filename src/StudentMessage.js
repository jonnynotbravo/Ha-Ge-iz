import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

const StudentMessage = () => {
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [teacherId, setTeacherId] = useState(
    localStorage.getItem("teacherId") || ""
  );
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const db = getDatabase();
  const messageListRef = useRef();

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Define the path based on the teacher and selected student
      const messagesRef = ref(db, `messages/${teacherId}/${studentId}`);

      push(messagesRef, {
        text: newMessage,
        sender: studentId,
        receiver: teacherId,
        timestamp: new Date().toISOString(),
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (teacherId) {
      // Define the path based on the teacher and selected student
      const messagesRef = ref(db, `messages/${teacherId}/${studentId}`);
      const messageListener = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.values(data);
          setMessages(messageList);
        } else {
          setMessages([]);
        }
      });

      return () => {
        // Clean up the listener to avoid memory leaks
        messageListener();
      };
    }
  }, [teacherId, studentId]);

  // Scroll to the bottom of the message list when new messages arrive
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="student-message-container">
      <div className="message-list" ref={messageListRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-item ${
              message.sender === studentId ? "receiver" : ""
            }`}
          >
            <strong className="message-sender"></strong>
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default StudentMessage;
