import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Footer from "./Footer";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        // setLoggedIn(true);
        navigate("/teacher");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
      });
  };

  return (
    <div className="login-container" style={{ background: "#444349" }}>
      <div className="login-box">
        <label htmlFor="teacherId">Teacher ID</label>
        <input
          type="text"
          id="teacherId"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="passKey">PassKey</label>
        <input
          type="password"
          id="passKey"
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

        <button
          onClick={handleLogin}
          style={{ background: "yellow", color: "black" }}
        >
          Login
        </button>
        <div className="note">
          <p>
            Note: Please be aware that this service is exclusively intended for
            authorized teachers and not for general login purposes.
          </p>
        </div>
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

export default TeacherLogin;
