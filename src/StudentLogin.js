import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Footer from "./Footer";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const StudentLogin = ({ setStudentLoggedIn, setStudentId, setSchoolId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  // ...
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError("");

      const user = userCredential.user;
      const { schoolId, teacherId, studentId, students } = await findUserSchool(
        user.email
      );
      localStorage.setItem("schoolId", schoolId);
      localStorage.setItem("studentId", studentId);
      localStorage.setItem("teacherId", teacherId);
      localStorage.setItem("students", JSON.stringify(students));

      console.log(teacherId);

      // setStudentId(studentId);
      // setSchoolId(schoolId);
      setStudentLoggedIn(true);
      navigate(`/student/`);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  // ...

  // Function to find the user's school based on their email
  // Function to find the user's school based on their email
  const findUserSchool = async (userEmail) => {
    const firestore = getFirestore();
    const students = []; // Initialize an array to store students
    console.log(students);

    // Query for the "Schools" collection
    const schoolsRef = collection(firestore, "Schools");
    const schoolsSnapshot = await getDocs(schoolsRef);

    for (const schoolDoc of schoolsSnapshot.docs) {
      const schoolId = schoolDoc.id;
      const studentsRef = collection(schoolDoc.ref, "Students");

      // Query for the student with the given email within this school
      const studentQuery = query(studentsRef, where("email", "==", userEmail));
      const studentQuerySnapshot = await getDocs(studentQuery);

      const allStudentsQuerySnapshot = await await getDocs(studentsRef);

      allStudentsQuerySnapshot.forEach((studentDoc) => {
        const studentData = studentDoc.data();
        students.push(studentData); // Push the student data to the array
      });

      if (!studentQuerySnapshot.empty) {
        // Student found in this school, add the student to the array
        const studentDoc = studentQuerySnapshot.docs[0];
        const studentData = studentDoc.data();
        const studentSchoolId = studentData.school;
        const studentId = studentDoc.id;
        const teacherId = studentData.teacher;

        return { schoolId, teacherId, studentId, students }; // Push the student data to the array
      }
    }

    if (students.length > 0) {
      // Student(s) found, return the array of students
      return { students };
    } else {
      throw new Error("Student not found in any school.");
    }
  };

  return (
    <div className="login-container" style={{ background: "#395796" }}>
      <div className="login-box">
        <label htmlFor="studentId">Student ID</label>
        <input
          type="text"
          id="studentId"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="error-message" style={{ color: "red", fontSize: 20 }}>
            {error}
            <br />
            <br />
          </div>
        )}

        <button onClick={handleLogin} style={{ background: "#0964FF" }}>
          Login
        </button>
        <Link
          to="/"
          style={{
            fontSize: "1rem",
            color: "#fff",
            background: "#33a6ff",
            padding: "1rem 1rem",
            borderRadius: "1rem",
            border: "none",
            marginTop: "2rem",
            cursor: "pointer",
            boxShadow: "2px 2px #33a6ff",
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default StudentLogin;
