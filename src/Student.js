import React, { useState, useEffect } from "react";

const Student = () => {
  const [gradeReports, setGradeReports] = useState([]);
  const [reportCards, setReportCards] = useState([]);
  const [messages, setMessages] = useState([]);

  // Fetch grade reports, report cards, and messages from an API or database
  useEffect(() => {
    // Example API request to fetch data
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

  // Example function to fetch student data from an API
  const fetchStudentData = async () => {
    // Simulate fetching data from an API
    return {
      gradeReports: [
        // Example grade report objects
        { subject: "Math", grade: "A" },
        { subject: "Science", grade: "B" },
        // Add more grade reports
      ],
      reportCards: [
        // Example report card objects
        { term: "Fall 2023", GPA: "3.7" },
        // Add more report cards
      ],
      messages: [
        // Example messages from teachers
        {
          sender: "Teacher 1",
          subject: "Regarding your recent test",
          message: "Your performance in the last test was excellent!",
        },
        // Add more messages
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

      {/* Add cool features here, e.g., a calendar, notifications, etc. */}
    </div>
  );
};

export default Student;
