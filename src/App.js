import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import SchoolsList from "./SchoolsList";
import GenericNotFound from "./GenericNotFound";
import Form from "./Form";
import About from "./About";
import Contact from "./Contact";
import School from "./School";
import AdminLogin from "./AdminLogin";
import StudentLogin from "./StudentLogin";
import Student from "./Student";
import TeacherLogin from "./TeacherLogin";
import Teacher from "./Teacher";
import Admin from "./Admin";
import ConfirmationPage from "./ConfirmationPage";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(false);
  const [teacherLoggedIn, setTeacherLoggedIn] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setStudentLoggedIn(true);
        setTeacherLoggedIn(true);
      } else {
        setLoggedIn(false);
        setStudentLoggedIn(false);
        setTeacherLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Terms-and-Conditions" element={<TermsAndConditions />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route
          path="/schools/:id/form/confirmation-page"
          element={<ConfirmationPage />}
        />
        <Route path="/schools" element={<SchoolsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/schools/:id" element={<School />} />
        {studentLoggedIn ? (
          <Route
            path="/student"
            element={<Student setStudentLoggedIn={setStudentLoggedIn} />}
          />
        ) : (
          <Route
            path="/student"
            element={<StudentLogin setStudentLoggedIn={setStudentLoggedIn} />}
          />
        )}

        {teacherLoggedIn ? (
          <Route
            path="/teacher"
            element={<Teacher setTeacherLoggedIn={setTeacherLoggedIn} />}
          />
        ) : (
          <Route
            path="/teacher"
            element={<TeacherLogin setTeacherLoggedIn={setTeacherLoggedIn} />}
          />
        )}

        <Route path="/schools/:id/form" element={<Form />} />
        {loggedIn ? (
          <Route path="/admin" element={<Admin setLoggedIn={setLoggedIn} />} />
        ) : (
          <Route
            path="/admin"
            element={<AdminLogin setLoggedIn={setLoggedIn} />}
          />
        )}

        <Route path="/404" element={<GenericNotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
