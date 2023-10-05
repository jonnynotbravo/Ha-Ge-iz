import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Student = ({ setStudentLoggedIn }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setStudentLoggedIn(false);
        navigate("/student-login"); // Redirect to the student login page
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  

  const [gradeReports, setGradeReports] = useState([]);
  const [reportCards, setReportCards] = useState([]);
  const [messages, setMessages] = useState([]);

 
  useEffect(() => {
    
    fetchStudentData()
      .then((data) => {
        setGradeReports(data.gradeReports);
        setReportCards(data.reportCards);
        setMessages(data.messages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const fetchStudentData = async () => {

    return {
      gradeReports: [
      
        { subject: "Math", grade: "A" },
        { subject: "Science", grade: "B" },
       
      ],
      reportCards: [
       
        { term: "Fall 2023", GPA: "3.7" },
      
      ],
      messages: [
        
        {
          sender: "Teacher 1",
          subject: "Regarding your recent test",
          message: "Your performance in the last test was excellent!",
        },
      
      ],
    };
  };

  return (
    <div className="student-container">
      <h1 className="header">Student Portal</h1>

      {/* Display Grade Reports */}
      <h2 className="header">Grade Reports</h2>
      <ul className="list">
        {gradeReports.map((report, index) => (
          <li key={index} className="list-item">
            {report.subject}: {report.grade}
          </li>
        ))}
      </ul>

      {/* Display Report Cards */}
      <h2 className="header">Report Cards</h2>
      <ul className="list">
        {reportCards.map((card, index) => (
          <li key={index} className="list-item">
            Term: {card.term}, GPA: {card.GPA}
          </li>
        ))}
      </ul>

      {/* Display Messages */}
      <h2 className="header">Messages</h2>
      <ul className="list">
        {messages.map((message, index) => (
          <li key={index} className="list-item">
            <strong>{message.sender}:</strong> {message.subject} -{" "}
            {message.message}
          </li>
        ))}
      </ul>

      {/* Add cool features , e.g., a calendar, notifications, etc. */}
      <button onClick={handleLogout} style={{ background: "#ff0000", color: "#fff" }}>
      Logout
    </button>
    </div>
  );
};

export default Student;
