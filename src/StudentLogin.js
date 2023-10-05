import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Footer from "./Footer";

const StudentLogin = ({setStudentLoggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        setStudentLoggedIn(true);
        navigate("/student");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
      });
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
        {/* <div className="note">
          <p>
            Note: Please be aware that this service is exclusively intended for
            authorized schools and not for general login purposes.
          </p>
        </div> */}
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
      <Footer />
    </div>
  );
};

export default StudentLogin;
