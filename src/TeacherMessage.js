import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

const TeacherMessage = () => {
  const [teacherId, setTeacherId] = useState(
    localStorage.getItem("teacherId") || ""
  );
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students") || [])
  );

  const [selectedStudent, setSelectedStudent] = useState(""); // Track the selected student

  const [teacherMessages, setTeacherMessages] = useState([]);
  const [newTeacherMessage, setNewTeacherMessage] = useState("");

  const db = getDatabase();

  const handleSendTeacherMessage = () => {
    if (newTeacherMessage.trim() !== "") {
      // Define the path based on the teacher and selected student
      const messagesRef = ref(db, `messages/${teacherId}/${selectedStudent}`);

      push(messagesRef, {
        text: newTeacherMessage,
        sender: teacherId,
        receiver: selectedStudent, // Set the receiver to the selected student
        timestamp: new Date().toISOString(),
      });
      setNewTeacherMessage("");
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      // Define the path based on the teacher and selected student
      const messagesRef = ref(db, `messages/${teacherId}/${selectedStudent}`);
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
    }
  }, [selectedStudent]);

  return (
    <div>
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
      <div>
        {teacherMessages.map((message, index) => (
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
          value={newTeacherMessage}
          onChange={(e) => setNewTeacherMessage(e.target.value)}
        />
        <button onClick={handleSendTeacherMessage}>Send</button>
      </div>
    </div>
  );
};

export default TeacherMessage;
