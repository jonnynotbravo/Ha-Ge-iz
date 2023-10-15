import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

const StudentMessage = () => {
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [schoolId, setSchoolId] = useState(
    localStorage.getItem("schoolId") || ""
  );
  const [teacherId, setTeacherId] = useState(
    localStorage.getItem("teacherId") || ""
  );

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log(teacherId);

  const db = getDatabase();
  const messagePath = `${studentId}_${teacherId}`;
  const messagesRef = ref(db, `messages/${messagePath}`);

  // ...

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
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
  }, []);

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.text}
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
