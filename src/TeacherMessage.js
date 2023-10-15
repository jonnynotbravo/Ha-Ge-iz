import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

const TeacherMessage = () => {
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [teacherId, setTeacherId] = useState(
    localStorage.getItem("teacherId") || ""
  );
  const [teacherMessages, setTeacherMessages] = useState([]);
  const [newTeacherMessage, setNewTeacherMessage] = useState("");

  function sanitizeEmail(email) {
    // Replace dots with underscores and remove other problematic characters
    return email.replace(/[.#$[\]\/]/g, "").replace(/\./g, "_");
  }
  // Sanitize email addresses to create valid paths
  // Sanitize email addresses to create valid paths
  const sanitizedStudentId = sanitizeEmail(studentId); // Replace with the actual email or identifier
  const sanitizedTeacherId = sanitizeEmail(teacherId); // Replace with the actual email or identifier

  const messagePath = createUniqueMessagePath(
    sanitizedStudentId,
    sanitizedTeacherId
  ); // Create a unique path
  const db = getDatabase(); // Create a unique path
  const messagesRef = ref(db, `messages/${messagePath}`);

  const createUniqueMessagePath = (studentId, teacherId) => {
    // You can create a unique path using the student and teacher IDs
    return `${studentId}_${teacherId}`;
  };

  // ...
  const handleSendTeacherMessage = () => {
    if (newTeacherMessage.trim() !== "") {
      push(messagesRef, {
        text: newTeacherMessage,
        sender: teacherId,
        receiver: studentId,
        timestamp: new Date().toISOString(),
      });
      setNewTeacherMessage("");
    }
  };

  useEffect(() => {
    const teacherMessageListener = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const teacherMessageList = Object.values(data);
        setTeacherMessages(teacherMessageList);
      } else {
        setTeacherMessages([]);
      }
    });

    return () => {
      // Clean up the listener to avoid memory leaks
      teacherMessageListener();
    };
  }, []);

  return (
    <div>
      <div>
        {teacherMessages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newTeacherMessage}
          onChange={(e) => setNewTeacherMessage(e.target.value)}
        />
        <button onClick={handleSendTeacherMessage}>Send</button>
      </div>
    </div>
  );
};

export default TeacherMessage;
