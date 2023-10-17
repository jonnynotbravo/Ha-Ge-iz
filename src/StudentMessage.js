import React, { useState, useEffect } from "react";
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

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Define the path based on the teacher and selected student
      const messagesRef = ref(db, `messages/${teacherId}/${studentId}`);

      push(messagesRef, {
        text: newMessage,
        sender: studentId,
        receiver: teacherId, // Set the receiver to the teacher
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

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>
              {message.sender} to {message.receiver}:
            </strong>{" "}
            {message.text}
          </div>
        ))}
      </div>
      <div>
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
