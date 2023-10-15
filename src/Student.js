import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const Student = ({ setStudentLoggedIn }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [schoolId, setSchoolId] = useState(
    localStorage.getItem("schoolId") || ""
  );

  useEffect(() => {
    const studentIdFromLocalStorage = localStorage.getItem("studentId");
    const schoolIdFromLocalStorage = localStorage.getItem("schoolId");

    if (studentIdFromLocalStorage) {
      setStudentId(studentIdFromLocalStorage);
    }

    if (schoolIdFromLocalStorage) {
      setSchoolId(schoolIdFromLocalStorage);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setStudentLoggedIn(false);
        navigate("/student"); // Redirect to the student login page
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleViewGrade = () => {
    navigate(`/student/viewgrade`);
  };

  return (
    <div className="student-container">
      <h1 className="header" style={{ color: "#0B63FF", fontSize: "70px" }}>
        Student Portal id: {studentId}
        school: {schoolId}
      </h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <div className="big-options">
        <div className="left-options">
          <Link to="/messages" className="big-option">
            <div className="big-option-content">
              <h2>Messages</h2>
              <p>View and manage your messages</p>
            </div>
          </Link>
          <div className="big-option" onClick={handleViewGrade}>
            <div className="big-option-content">
              <h2>Grades</h2>
              <p>Check your grades and progress</p>
            </div>
          </div>
        </div>
        <div className="right-options">
          <Link to="/report-card" className="big-option">
            <div className="big-option-content">
              <h2>Report Card</h2>
              <p>View your academic performance</p>
            </div>
          </Link>
          <Link to="/profile" className="big-option">
            <div className="big-option-content">
              <h2>Profile</h2>
              <p>Manage your profile settings</p>
            </div>
          </Link>
        </div>
      </div>
      {/* Add cool features, e.g., a calendar, notifications, etc. */}
    </div>
  );
};

export default Student;
