import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

const TeacherMessage = () => {
  const [teacherId, setTeacherId] = useState(
    localStorage.getItem("teacherId") || ""
  );
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students") || [])
  );

  const [selectedStudent, setSelectedStudent] = useState("");
  const [teacherMessages, setTeacherMessages] = useState([]);
  const [newTeacherMessage, setNewTeacherMessage] = useState("");

  const db = getDatabase();
  const messageListRef = useRef();

  const handleSendTeacherMessage = () => {
    if (newTeacherMessage.trim() !== "") {
      const messagesRef = ref(db, `messages/${teacherId}/${selectedStudent}`);
      push(messagesRef, {
        text: newTeacherMessage,
        sender: teacherId,
        receiver: selectedStudent,
        timestamp: new Date().toISOString(),
      });
      setNewTeacherMessage("");
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      const messagesRef = ref(db, `messages/${teacherId}/${selectedStudent}`);
      const teacherMessageListener = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const teacherMessageList = Object.values(data);
          setTeacherMessages(teacherMessageList);
          setTimeout(scrollToBottom, 0); // Scroll after the component updates
        } else {
          setTeacherMessages([]);
        }
      });

      return () => {
        teacherMessageListener();
      };
    }
  }, [selectedStudent]);

  return (
    <div className="teacher-message-container">
      <div>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select a student</option>
          {students.map((student, index) => (
            <option key={index} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div className="message-list" ref={messageListRef}>
        {teacherMessages.map((message, index) => (
          <div
            key={index}
            className={`message-item ${
              message.sender === teacherId ? "sent" : "received"
            }`}
          >
            <strong></strong> {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
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
