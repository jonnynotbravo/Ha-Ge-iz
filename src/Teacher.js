import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const Teacher = ({ setTeacherLoggedIn }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTeacherLoggedIn(false);
        navigate("/teacher"); // Redirect to the teacher login page
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleInputGrades = () => {
    navigate(`/teacher/input-grade`);
  };

  const handleMessageStudents = () => {
    navigate(`/teacher/messages`);
  };

  const handleAttendance = () => {
    navigate(`/teacher/attendance`);
  };

  const handleInputReportCard = () => {
    navigate(`/teacher/inputreportcard`);
  };

  return (
    <div className="teacher-container">
      <h1 className="header" style={{ color: "black", fontSize: "70px" }}>
        Teacher Portal
      </h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <div className="big-options">
        <div className="left-options">
          <div onClick={handleMessageStudents} className="big-option">
            <div className="big-option-content">
              <h2>Message Students</h2>
              <p>Send messages to students</p>
            </div>
          </div>
          <div className="big-option" onClick={handleInputGrades}>
            <div className="big-option-content">
              <h2>Input Grades</h2>
              <p>Submit student grades</p>
            </div>
          </div>
          <div className="big-option" onClick={handleAttendance}>
            <div className="big-option-content">
              <h2>Manage Attendance</h2>
              <p>Record and manage student attendance</p>
            </div>
          </div>
        </div>
        <div className="right-options">
          <div className="big-option" onClick={handleInputReportCard}>
            <div className="big-option-content">
              <h2>Input Report Card</h2>
              <p>Submit report card information</p>
            </div>
          </div>
        </div>
      </div>
      {/* Add more features as needed */}
      {/* <Footer /> */}
    </div>
  );
};

export default Teacher;
