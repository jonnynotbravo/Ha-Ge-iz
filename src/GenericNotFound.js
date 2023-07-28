import React from "react";
import { Link } from "react-router-dom";

const GenericNotFound = () => {
  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>404 Not Found</h1>
      <p style={messageStyles}>The school you are looking for was not found.</p>
      <Link to="/schools" style={browseButtonStyles}>
        Browse Schools
      </Link>
    </div>
  );
};

// CSS styles
const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#f0f0f0",
  fontFamily: "Helvetica, Arial, sans-serif",
};

const titleStyles = {
  fontSize: "48px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#404040",
};

const messageStyles = {
  fontSize: "24px",
  color: "#606060",
  marginBottom: "30px",
};

const browseButtonStyles = {
  padding: "12px 24px",
  borderRadius: "5px",
  background: "#007bff",
  color: "#fff",
  textDecoration: "none",
  fontSize: "20px",
  fontWeight: "bold",
  transition: "background 0.3s ease",
};

const browseButtonHoverStyles = {
  background: "#0056b3",
};

export default GenericNotFound;
