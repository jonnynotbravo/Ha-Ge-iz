import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <label htmlFor="schoolId">School ID</label>
        <input type="text" id="schoolId" />
        <label htmlFor="passKey">PassKey</label>
        <input type="password" id="passKey" />
        <button>Login</button>
        <div className="note">
          <p>
            Note: Please be aware that this service is exclusively intended for
            authorized schools and not for general login purposes.
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
    </div>
  );
};

export default Login;
